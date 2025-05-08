document.addEventListener('DOMContentLoaded', () => {
    const loader      = document.getElementById('loader');
    const enterButton = document.getElementById('enter-button');
    const canvas      = document.getElementById('noise-canvas');
    const ctx         = canvas.getContext('2d');
  
    // Resize canvas to cover loader
    function resize() {
      canvas.width  = loader.clientWidth;
      canvas.height = loader.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();
  
    // Two noise layers with higher densities:
    const layers = [
      { pixel: 1, density: 0.30, alpha: 0.2 },  // fine grain (30% of 1×1 blocks)
      { pixel: 2, density: 0.15, alpha: 0.3 }   // small flickers (15% of 2×2 blocks)
    ];
  
    let frameId;
    (function drawNoise() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (const { pixel, density, alpha } of layers) {
        ctx.fillStyle   = '#FFFFFF';
        ctx.globalAlpha = alpha;
        for (let x = 0; x < canvas.width; x += pixel) {
          for (let y = 0; y < canvas.height; y += pixel) {
            if (Math.random() < density) {
              ctx.fillRect(x, y, pixel, pixel);
            }
          }
        }
      }
  
      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(drawNoise);
    })();
  
    // Fade out & stop noise when entering
    enterButton.addEventListener('click', () => {
      loader.classList.add('loader--loaded');
      loader.addEventListener('transitionend', () => {
        cancelAnimationFrame(frameId);
        loader.style.display = 'none';
      }, { once: true });
    });
  });
  