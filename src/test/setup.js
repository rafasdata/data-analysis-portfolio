import '@testing-library/jest-dom';

// Mock Canvas getContext for Chart.js in JSDOM environment
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => ([]),
    setTransform: () => {},
    drawFocusIfNeeded: () => {},
    createRadialGradient: () => {},
    createLinearGradient: () => {},
    beginPath: () => {},
    fill: () => {},
    stroke: () => {},
    arc: () => {},
    arcTo: () => {},
    scale: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
    save: () => {},
    restore: () => {},
  };
};
