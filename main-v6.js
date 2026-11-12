'use strict';
document.querySelectorAll('#year').forEach(node => { node.textContent = new Date().getFullYear(); });
document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status') || document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('joeyolivari@gmail.com');
      status.textContent = document.documentElement.lang === 'es' ? 'Dirección de correo copiada.' : 'Email address copied.';
    } catch {
      status.textContent = document.documentElement.lang === 'es' ? 'No se pudo copiar. El correo es joeyolivari@gmail.com.' : 'Copy failed. The address is joeyolivari@gmail.com.';
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
      const ok = el.type === 'checkbox' ? el.checked : (el.value.trim() !== '' && el.checkValidity());
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      status.textContent = document.documentElement.lang === 'es' ? 'Completa los campos obligatorios, tu correo y la casilla de consentimiento.' : 'Please complete all required fields, provide a valid reply email, and check the consent box.';
      status.classList.add('error');
      firstBad.focus();
      return;
    }
    status.classList.remove('error');
    status.textContent = document.documentElement.lang === 'es' ? 'Enviando tu solicitud…' : 'Submitting your inquiry securely…';
    form.submit();
  });
  form.querySelectorAll('[required]').forEach(el => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));
}
