// Your code here.
<script>
  const container = document.querySelector('.items');
  const cubes = document.querySelectorAll('.item');

  cubes.forEach(cube => {
    cube.style.position = 'absolute';
    const rect = cube.getBoundingClientRect();
    cube.style.left = `${rect.left - container.offsetLeft}px`;
    cube.style.top = `${rect.top - container.offsetTop}px`;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    cube.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - cube.getBoundingClientRect().left;
      offsetY = e.clientY - cube.getBoundingClientRect().top;

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
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
</script>
