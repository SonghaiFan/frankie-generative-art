
import React, { useEffect, useRef } from 'react';

interface P5RendererProps {
  code: string;
}

const P5Renderer: React.FC<P5RendererProps> = ({ code }) => {
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
            body { margin: 0; padding: 0; overflow: hidden; background: #000; }
            canvas { display: block; }
          </style>
        </head>
        <body>
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
