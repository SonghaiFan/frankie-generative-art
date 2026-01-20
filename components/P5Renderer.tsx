
import React, { useEffect, useRef } from 'react';

interface P5RendererProps {
  code: string;
  styleName?: string;
  explanation?: string;
}

const P5Renderer: React.FC<P5RendererProps> = ({ code, styleName, explanation }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // We wrap the user's code in a script tag and inject p5.js CDN.
    // CSS ensures canvas is block level to avoid scrollbars.
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/addons/p5.sound.min.js"></script>
          <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;400;700&display=swap');
            body { margin: 0; padding: 0; overflow: hidden; background: #000; font-family: 'Noto Serif SC', serif; }
            canvas { display: block; }
            #overlay {
                position: absolute;
                bottom: 40px;
                left: 40px;
                max-width: 560px;
                color: white;
                mix-blend-mode: difference;
                pointer-events: none;
                z-index: 100;
            }
            .meta { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 0.5rem; opacity: 0.7; }
            h1 { font-size: 3.5rem; margin: 0 0 1rem 0; font-weight: 200; letter-spacing: -0.02em; line-height: 1.1; }
            p { font-size: 1rem; line-height: 1.6; opacity: 0.9; margin: 0; padding-left: 1rem; border-left: 1px solid rgba(255,255,255,0.5); }
          </style>
        </head>
        <body>
          ${styleName ? `
          <div id="overlay">
            <div class="meta">Aesthetic Signature</div>
            <h1>${styleName}</h1>
            <p>${explanation || ""}</p>
          </div>
          ` : ""}
          <script>
            // Patch getContext to set willReadFrequently and fix the warning
            const oldGetContext = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(type, attributes) {
              if (type === '2d') {
                attributes = attributes || {};
                attributes.willReadFrequently = true;
              }
              return oldGetContext.call(this, type, attributes);
            };

            // Suppress ml5 logo if possible
            if (window.ml5) ml5.config = { noLogo: true };

            // Ensure p5.js sound works with user gesture inside iframe
            const resumeAudio = function() {
              if (window.getAudioContext) {
                window.getAudioContext().resume();
              }
            };
            window.addEventListener('mousedown', resumeAudio);
            window.addEventListener('touchstart', resumeAudio);

            try {
              ${code}
            } catch (e) {
              console.error("Art generation error:", e);
              document.body.innerHTML = '<div style="color:white; padding:20px; font-family:sans-serif; text-align:center; opacity:0.5;">Pattern integrity compromised.</div>';
            }
          </script>
        </body>
      </html>
    `;

    iframeRef.current.srcdoc = htmlContent;
  }, [code]);

  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        ref={iframeRef}
        title="Generative Art Canvas"
        className="w-full h-full border-none pointer-events-auto"
        sandbox="allow-scripts allow-same-origin"
        allow="camera *; microphone *; autoplay *; display-capture *"
      />
    </div>
  );
};

export default P5Renderer;
