const modeInstructions = {
    static: `PURE STATIC/GENERATIVE: 
      - Focus: High-detail algorithmic geometry, noise-based patterns (Perlin/Simplex), and recursive structures. 
      - Interaction: Interaction limited to mouseX/mouseY or touch. MUST NOT use webcam or microphone.
      - Style: HSB color mode, dark background, no external assets, fullscreen (windowResized).`,
    camera: `VISION-BASED: 
      - Focus: Computer vision and motion tracking.
      - Input: Webcam via 'createCapture(VIDEO)'. Use center-cropping.
      - Library: ml5.js v1. Use 'handPose = ml5.handPose({flipped:true}, callback)' and 'handPose.detectStart(video, callback)'. NEVER pass video as the first argument to constructors.
      - Mirroring: Mirror the video display for intuitive "mirror-like" interaction: 'push(); translate(width, 0); scale(-1, 1); image(video, 0, 0); pop();'.
      - Optimization: If using loadPixels() for video analysis, you MUST use a p5.Graphics bridge with context attribute 'willReadFrequently: true' to avoid performance warnings.
      - Style: HSB color mode, dark background, no external assets, fullscreen (windowResized).`,
    audio: `SONIC-REACTIVE: 
      - Focus: Frequency and amplitude analysis. 
      - Input: Microphone via p5.sound. Use 'mic = new p5.AudioIn(); mic.start(); fft = new p5.FFT(); fft.setInput(mic);'. 
      - Browser Policy: You MUST implement 'function mousePressed() { userStartAudio(); }'.
      - Style: HSB color mode, dark background, no external assets, fullscreen (windowResized).`,
  };
export { modeInstructions };
