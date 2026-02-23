document.addEventListener('DOMContentLoaded', () => {

  // --- Sidebar Toggle for Mobile ---
  const sidebarBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // --- Tab View Switching ---
  const viewButtons = document.querySelectorAll('.sidebar-btn');
  const views = document.querySelectorAll('.view-content');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active states from all buttons
      viewButtons.forEach(b => b.classList.remove('active'));
      // Hide all views
      views.forEach(v => v.classList.add('hidden'));
      
      // Add active state to clicked button
      e.currentTarget.classList.add('active');
      
      // Show target view
      const targetView = e.currentTarget.getAttribute('data-view') + 'View';
      document.getElementById(targetView).classList.remove('hidden');

      // On mobile, close sidebar after clicking a link
      if (window.innerWidth < 1024) {
        sidebar.classList.add('collapsed');
      }
    });
  });

  // --- Basic Clock/Update Feature ---
  const lastUpdate = document.getElementById('lastUpdate');
  setInterval(() => {
    const now = new Date();
    lastUpdate.textContent = now.toLocaleTimeString();
  }, 1000);

  // --- Speed Slider update ---
  const speedSlider = document.getElementById('speedControl');
  const speedPercent = document.getElementById('speedPercent');
  if(speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speedPercent.textContent = `${e.target.value}%`;
    });
  }

  // --- Video Feed Canvas Dummy Setup ---
  const canvas = document.getElementById('videoCanvas');
  if(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Animate some noise to simulate a camera feed before connection
    function drawNoise() {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      
      for(let i = 0; i < buffer32.length; i++) {
          buffer32[i] = ((255 * Math.random()) | 0) << 24; // Noise
      }
      ctx.putImageData(imgData, 0, 0);
      
      // Draw grid overlay
      ctx.fillStyle = 'rgba(0, 245, 255, 0.1)';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      
      for(let i = 0; i < w; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for(let i = 0; i < h; i += 50) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      requestAnimationFrame(drawNoise);
    }
    drawNoise();
  }
});
