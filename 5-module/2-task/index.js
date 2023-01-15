function toggleText() {
  let textNode = document.getElementById('text');
  const toggleTextBtn = document.querySelector('.toggle-text-button');
  if (toggleTextBtn) toggleTextBtn.addEventListener('click', () => {
    if ( textNode ) textNode.hidden = !textNode.hidden;
  });
  }
