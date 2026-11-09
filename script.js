'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation?.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (navigation?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu();
});
document.querySelectorAll('.grant-logo img').forEach(img => {
  const fallback = () => img.classList.add('is-broken');
  img.addEventListener('error', fallback);
  if (img.complete && img.naturalWidth === 0) fallback();
});
const briefForm = document.getElementById('brief-form');
const briefStatus = document.getElementById('brief-status');
briefForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const topic = briefForm.querySelector('[name="type"]')?.value || 'Индивидуальный конструктор';
  const idea = briefForm.querySelector('[name="idea"]')?.value.trim() || '';
  if (!idea) { briefStatus.textContent = 'Опишите вашу идею, чтобы подготовить текст.'; return; }
  const content = 'Заявка Brick Lab 3D\nТип: ' + topic + '\nОписание: ' + idea;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(content);
    briefStatus.textContent = 'Описание скопировано. Теперь перейдите к форме заявки по ссылке ниже и вставьте текст.';
  } catch (e) {
    const textarea = briefForm.querySelector('textarea');
    textarea.focus();
    textarea.select();
    briefStatus.textContent = 'Автокопирование недоступно. Скопируйте выбранный текст вручную (Ctrl+C), затем откройте форму по ссылке ниже.';
  }
});