'use strict';
document.querySelectorAll('#year').forEach(node => { node.textContent = new Date().getFullYear(); });
document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('joeyolivari@gmail.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email link above to send a message.';
    }
  });
});
const shot = document.querySelector('#screenshot');
if (shot) {
  const fallback = () => {
    shot.hidden = true;
    const panel = document.querySelector('#fallback');
    if (panel) panel.hidden = false;
  };
  shot.addEventListener('error', fallback);
  if (shot.complete && !shot.naturalWidth) fallback();
}
