
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { StarState, NetworkNode, NetworkLink, ActiveConstellation } from '../types';

interface VoidFieldProps {
  stars: StarState[];
  activeConstellation: ActiveConstellation | null;
  networkNodes?: NetworkNode[];
  networkLinks?: NetworkLink[];
  onSpaceClick?: (e: React.MouseEvent) => void;
  onNodeClick?: (id: number) => void;
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string | number;
  type: 'star' | 'concept';
  label?: string;
  brightness?: number;
  r?: number;
  // Visual coordinates for "Digital Archive" look
  displayX?: string; 
  displayY?: string;
  
  // Target position for force layout
  targetX?: number; 
  targetY?: number;
  
  // D3 Props
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | number | SimNode;
  target: string | number | SimNode;
}

const VoidField: React.FC<VoidFieldProps> = ({ 
  stars, 
  activeConstellation, 
  networkNodes = [], 
  networkLinks = [], 
  onSpaceClick,
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  
  // Refs to hold latest props/callbacks to avoid restarting simulation on every render
  const onNodeClickRef = useRef(onNodeClick);
  const activeConstellationRef = useRef(activeConstellation);

  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

  useEffect(() => {
    activeConstellationRef.current = activeConstellation;
    // Keep simulation "warm" if animation is happening, so tick fires
    if (activeConstellation && simulationRef.current) {
        simulationRef.current.alpha(0.1).restart();
    }
  }, [activeConstellation]);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;
    
    // Coordinate Mapper: 0-100% -> Center-based coordinates
    const getTargetPos = (percentX: number, percentY: number) => ({
        x: (percentX / 100) * width - width / 2,
        y: (percentY / 100) * height - height / 2
    });

    // --- 1. SETUP SIMULATION ---
    if (!simulationRef.current) {
      simulationRef.current = d3.forceSimulation<SimNode, SimLink>()
        .force("charge", d3.forceManyBody().strength(-20)) 
        .force("collide", d3.forceCollide().radius(12).strength(0.5))
        .force("x", d3.forceX((d: SimNode) => d.targetX ?? 0).strength(0.5)) // Stiffer for drawer feel
        .force("y", d3.forceY((d: SimNode) => d.targetY ?? 0).strength(0.5));
    }
    const simulation = simulationRef.current;

    // --- 2. DATA PROCESSING ---
    const newNodes: SimNode[] = [];
    
    // Stars
    stars.forEach(s => {
      const existing = nodesRef.current.find(n => n.id === s.id && n.type === 'star');
      const pos = getTargetPos(s.x, s.y);
      const displayCoord = `SEC-${Math.floor(s.x).toString().padStart(2,'0')}.${Math.floor(s.y).toString().padStart(2,'0')}`;

      if (existing) {
        existing.targetX = pos.x;
        existing.targetY = pos.y;
        newNodes.push(existing); 
      } else {
        newNodes.push({
          id: s.id,
          type: 'star',
          x: pos.x + (Math.random() - 0.5) * 5, 
          y: pos.y + (Math.random() - 0.5) * 5,
          targetX: pos.x,
          targetY: pos.y,
          brightness: s.brightness,
          r: (s.z || 0.5) * 2 + 1,
          displayX: (s.x).toFixed(2),
          displayY: (s.y).toFixed(2),
          label: displayCoord
        });
      }
    });

    // Concepts (Active Network)
    networkNodes.forEach(n => {
      const existing = nodesRef.current.find(nRef => nRef.id === n.id);
      const pos = getTargetPos(n.x, n.y);

      if (existing) {
        existing.targetX = pos.x;
        existing.targetY = pos.y;
        newNodes.push(existing);
      } else {
        newNodes.push({
          id: n.id,
          type: 'concept',
          label: n.label,
          x: pos.x, 
          y: pos.y,
          targetX: pos.x, 
          targetY: pos.y,
          r: 5,
          displayX: (n.x).toFixed(2),
          displayY: (n.y).toFixed(2)
        });
      }
    });

    nodesRef.current = newNodes;
    
    // Links
    const newLinks: SimLink[] = networkLinks.map(l => ({
      source: l.sourceId,
      target: l.targetId
    }));
    linksRef.current = newLinks;

    // Update Simulation
    simulation.nodes(nodesRef.current);
    simulation.force("link", d3.forceLink<SimNode, SimLink>(linksRef.current)
        .id(d => d.id as string)
        .distance(50)
        .strength(0.2)
    );
    simulation.alpha(0.3).restart();

    // --- 3. DOM MANAGEMENT (Data Join) ---
    const svg = d3.select(svgRef.current);
    const zoomGroup = svg.select<SVGGElement>(".zoom-group");
    const gridLayer = zoomGroup.select<SVGGElement>(".grid-layer");

    // Defs for Glow Filter
    let defs = svg.select("defs");
    if (defs.empty()) {
        defs = svg.append("defs");
        const glow = defs.append("filter")
            .attr("id", "node-glow")
            .attr("width", "300%")
            .attr("height", "300%")
            .attr("x", "-100%")
            .attr("y", "-100%");
            
        glow.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", "3")
            .attr("result", "coloredBlur");

        const feMerge = glow.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    }
    
    // Grid Setup (Run once)
    if (gridLayer.select("line").empty()) {
        const gridSize = 4000;
        const spacing = 150;
        for (let i = -gridSize; i <= gridSize; i += spacing) {
            // Thin white lines, slightly visible (0.08 opacity)
            gridLayer.append("line").attr("x1", -gridSize).attr("y1", i).attr("x2", gridSize).attr("y2", i).attr("stroke", "#ffffff").attr("stroke-opacity", 0.08).attr("stroke-width", 0.5);
            gridLayer.append("line").attr("x1", i).attr("y1", -gridSize).attr("x2", i).attr("y2", gridSize).attr("stroke", "#ffffff").attr("stroke-opacity", 0.08).attr("stroke-width", 0.5);
        }
    }

    // Zoom Setup (Run once)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        zoomGroup.attr("transform", event.transform);
      });
    svg.call(zoom);
    if (svg.attr("data-initialized") !== "true") {
       svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1));
       svg.attr("data-initialized", "true");
    }

    // --- LINKS ENTER/EXIT ---
    const linkSel = zoomGroup.select(".links-layer")
      .selectAll<SVGLineElement, SimLink>("line")
      .data(linksRef.current);
    
    linkSel.exit().remove();
    
    const linkEnter = linkSel.enter()
      .append("line")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 0.5);
      
    const allLinks = linkSel.merge(linkEnter);

    // --- NODES ENTER/EXIT ---
    const nodeSel = zoomGroup.select(".nodes-layer")
      .selectAll<SVGGElement, SimNode>("g.node-group")
      .data(nodesRef.current, d => String(d.id));

    nodeSel.exit().remove();

    const nodeEnter = nodeSel.enter()
      .append("g")
      .attr("class", "node-group")
      .style("cursor", "crosshair"); // Ensure pointer cursor
      
    // Node Shape
    nodeEnter.append("circle")
        .attr("class", "main-dot")
        .attr("r", d => d.type === 'concept' ? 5 : (d.r || 2));

    // Hover Elements (Updated to white style)
    const hoverGroup = nodeEnter.append("g")
        .attr("class", "hover-ui")
        .attr("opacity", 0)
        .style("pointer-events", "none");
        
    hoverGroup.append("line").attr("class", "ch-x").attr("stroke", "#ffffff").attr("stroke-width", 0.5).attr("stroke-dasharray", "4,2").attr("x1", -2000).attr("y1", 0).attr("x2", 2000).attr("y2", 0).attr("opacity", 0.5);
    hoverGroup.append("line").attr("class", "ch-y").attr("stroke", "#ffffff").attr("stroke-width", 0.5).attr("stroke-dasharray", "4,2").attr("x1", 0).attr("y1", -2000).attr("x2", 0).attr("y2", 2000).attr("opacity", 0.5);
    const labelG = hoverGroup.append("g").attr("transform", "translate(10, -20)");
    labelG.append("rect").attr("fill", "rgba(0, 0, 0, 0.9)").attr("stroke", "#ffffff").attr("stroke-width", 1).attr("rx", 0).attr("height", 20);
    labelG.append("text").attr("fill", "#ffffff").attr("x", 8).attr("y", 13).style("font-family", "monospace").style("font-size", "10px").style("letter-spacing", "1px");

    // Bind Events to NodeEnter (Once per node)
    nodeEnter
        .on("click", (event, d) => {
            event.stopPropagation(); // Stop zoom propagation
            if (d.type === 'star' && onNodeClickRef.current) {
                // Cast id to number if it matches the initial star ID pattern
                onNodeClickRef.current(Number(d.id));
            }
        })
        .on("mouseenter", function(e, d) {
             d3.select(this).select(".hover-ui").transition().duration(100).attr("opacity", 1);
             // Glow effect on hover for all nodes
             d3.select(this).select(".main-dot")
               .transition().duration(200)
               .attr("r", 8)
               .attr("fill", "#ffffff")
               .attr("fill-opacity", 1)
               .style("filter", "url(#node-glow)");
        })
        .on("mouseleave", function(e, d) {
             d3.select(this).select(".hover-ui").transition().duration(200).attr("opacity", 0);
             // Restore original look
             const isConcept = d.type === 'concept';
             d3.select(this).select(".main-dot").transition().duration(200)
               .attr("r", isConcept ? 5 : (d.r || 2))
               .attr("fill", "#ffffff")
               .attr("fill-opacity", isConcept ? 1 : (d.brightness || 0.6))
               .style("filter", isConcept ? "url(#node-glow)" : "none");
        });

    // Merge selections for tick updates
    const allNodes = nodeSel.merge(nodeEnter);

    // Update static attributes that might change
    allNodes.select("text").text(d => d.type === 'concept' ? (d.label || '') : `ARCHIVE // ${d.label || ''}`);
    allNodes.select("text").each(function() {
         const el = this as SVGTextElement;
         const bbox = el.getBBox();
         d3.select(el.parentNode as SVGGElement).select("rect").attr("width", bbox.width + 16);
    });
    
    // Update Node Appearance
    allNodes.select(".main-dot")
        .attr("fill", "#ffffff") // Base white
        .attr("fill-opacity", d => d.type === 'concept' ? 1 : (d.brightness || 0.6))
        .attr("stroke", "none") // No borders
        .style("filter", d => d.type === 'concept' ? "url(#node-glow)" : "none");


    // --- TICK LOOP ---
    simulation.on("tick", () => {
      // 1. Update Links
      allLinks
        .attr("x1", d => (d.source as SimNode).x!)
        .attr("y1", d => (d.source as SimNode).y!)
        .attr("x2", d => (d.target as SimNode).x!)
        .attr("y2", d => (d.target as SimNode).y!);

      // 2. Update Nodes
      allNodes.attr("transform", d => `translate(${d.x},${d.y})`);

      // 3. Draw Active Constellation (Dynamic)
      // Accessing via ref to ensure we draw the latest frame without re-running Effect
      const currentConstellation = activeConstellationRef.current;
      const constLayer = zoomGroup.select(".constellation-layer");
      constLayer.selectAll("*").remove();

      if (currentConstellation && currentConstellation.path.length > 1) {
          const pathNodes = currentConstellation.path
            .map(id => nodesRef.current.find(n => n.id === id))
            .filter(Boolean) as SimNode[];

          if (pathNodes.length >= 2) {
             const totalLen = pathNodes.length - 1;
             const curIdx = Math.floor(currentConstellation.progress * totalLen);
             
             // Completed Segments
             for (let i = 0; i < curIdx; i++) {
                 constLayer.append("line")
                     .attr("x1", pathNodes[i].x!).attr("y1", pathNodes[i].y!)
                     .attr("x2", pathNodes[i+1].x!).attr("y2", pathNodes[i+1].y!)
                     .attr("stroke", "#ffffff").attr("stroke-width", 1.5).attr("stroke-opacity", 0.8);
             }
             
             // Active Segment
             if (curIdx < totalLen) {
                 const p1 = pathNodes[curIdx];
                 const p2 = pathNodes[curIdx+1];
                 const segmentProg = (currentConstellation.progress * totalLen) - curIdx;
                 const lx = p1.x! + (p2.x! - p1.x!) * segmentProg;
                 const ly = p1.y! + (p2.y! - p1.y!) * segmentProg;
                 
                 constLayer.append("line")
                     .attr("x1", p1.x!).attr("y1", p1.y!).attr("x2", lx).attr("y2", ly)
                     .attr("stroke", "#ffffff").attr("stroke-width", 2).attr("stroke-dasharray", "2,2");
                 constLayer.append("circle")
                     .attr("cx", lx).attr("cy", ly).attr("r", 4)
                     .attr("fill", "#ffffff").style("filter", "url(#node-glow)");
             }
          }
      }
    });

    // Cleanup
    return () => {
      simulation.stop();
    };

  }, [stars, networkNodes, networkLinks]); // Re-run only when topology changes

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full bg-black overflow-hidden">
      <svg 
        ref={svgRef}
        className="w-full h-full block"
        onClick={onSpaceClick}
      >
        <g className="zoom-group">
           <g className="grid-layer" />
           <g className="links-layer" />
           <g className="nodes-layer" />
           <g className="constellation-layer" />
        </g>
      </svg>
    </div>
  );
};

export default VoidField;
