document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  // Typewriter effect
  document.querySelectorAll('.typewrite').forEach(el => {
    let items = [];
    try { items = JSON.parse(el.dataset.type || '[]'); } catch (_) { items = []; }
    if (!items.length) return;
    let index = 0, text = '', deleting = false;
    const period = Number(el.dataset.period || 1800);
    function tick() {
      const full = items[index % items.length];
      text = deleting ? full.substring(0, text.length - 1) : full.substring(0, text.length + 1);
      el.textContent = text;
      let delay = deleting ? 45 : 90;
      if (!deleting && text === full) { delay = period; deleting = true; }
      else if (deleting && text === '') { deleting = false; index++; delay = 350; }
      setTimeout(tick, delay);
    }
    tick();
  });

  // WhatsApp contact form
  const form = document.getElementById('whatsapp-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('wa-name').value.trim();
      const email = document.getElementById('wa-email').value.trim();
      const message = document.getElementById('wa-message').value.trim();
      if (!name || !email || !message) return;
      const text = `Hi Sujeet,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from your portfolio.`;
      const url = `https://wa.me/917900440023?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
