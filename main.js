'use strict';
document.querySelectorAll('#year').forEach(node => { node.textContent = new Date().getFullYear(); });
document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status') || document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('joeyolivari@gmail.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Copy failed. The address is joeyolivari@gmail.com.';
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
const form = document.querySelector('#inquiry');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let firstBad = null;
    form.querySelectorAll('[required]').forEach(el => {
      const ok = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      status.textContent = 'Please fill in your name, what you need, what the report should answer, and tick the consent box.';
      status.classList.add('error');
      firstBad.focus();
      return;
    }
    status.classList.remove('error');
    const v = name => (form.elements[name].value || '').trim();
    const lines = ['Name: ' + v('name')];
    if (v('business')) lines.push('Business: ' + v('business'));
    lines.push('Service: ' + v('service'));
    if (v('size')) lines.push('Size: ' + v('size'));
    if (v('deadline')) lines.push('Deadline: ' + v('deadline'));
    if (v('version')) lines.push('Excel version: ' + v('version'));
    lines.push('', 'What the report should answer:', v('goal'), '', '(I can attach a sample file with sensitive details removed.)');
    const subject = 'Quote request: ' + v('service');
    window.location.href = 'mailto:joeyolivari@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    status.textContent = 'Your email app should open with the message ready. Press send there to reach me.';
  });
  form.querySelectorAll('[required]').forEach(el => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));
}
