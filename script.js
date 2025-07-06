const container = document.getElementById('container');
const cubeSize = 200;
const gap = 20;
const columns = 5;

// Create 25 cubes and position them in grid layout
for (let i = 0; i < 25; i++) {
  const cube = document.createElement('div');
  cube.classList.add('item');
  cube.textContent = (i + 1).toString().padStart(2, '0');

  const row = Math.floor(i / columns);
  const col = i % columns;
  const left = col * (cubeSize + gap);
  const top = row * (cubeSize + gap);

  cube.style.left = `${left}px`;
  cube.style.top = `${top}px`;

  container.appendChild(cube);

  // Drag functionality
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;
    cube.style.zIndex = 1000;

    function onMouseMove(e) {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      let x = e.clientX - containerRect.left - offsetX;
      let y = e.clientY - containerRect.top - offsetY;

      // Boundaries
      x = Math.max(0, Math.min(x, container.clientWidth - cube.offsetWidth));
      y = Math.max(0, Math.min(y, container.clientHeight - cube.offsetHeight));

      cube.style.left = x + 'px';
      cube.style.top = y + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      cube.style.zIndex = 1;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
