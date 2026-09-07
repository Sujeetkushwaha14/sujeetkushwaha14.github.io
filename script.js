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

  // Instagram-style mobile bottom navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length) {
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    const icons = {
      'index.html': '⌂',
      'about.html': '●',
      'skills.html': '⚙',
      'projects.html': '▣',
      'certifications.html': '✓',
      'contact.html': '✉'
    };
    const labels = {
      'index.html': 'Home',
      'about.html': 'Profile',
      'skills.html': 'Skills',
      'projects.html': 'Projects',
      'certifications.html': 'Certs',
      'contact.html': 'Contact'
    };
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      const file = href.split('/').pop().toLowerCase() || 'index.html';
      const item = document.createElement('a');
      item.href = href;
      if (file === current) item.classList.add('active');
      item.innerHTML = `<span class="nav-icon">${icons[file] || '•'}</span><span>${labels[file] || link.textContent.trim()}</span>`;
      bottomNav.appendChild(item);
    });

    document.body.appendChild(bottomNav);

    const style = document.createElement('style');
    style.textContent = `
      .mobile-bottom-nav{display:none}
      @media(max-width:700px){
        body{padding-bottom:76px}
        .mobile-bottom-nav{position:fixed;left:10px;right:10px;bottom:max(10px,env(safe-area-inset-bottom));z-index:2000;display:flex;align-items:stretch;justify-content:space-around;gap:2px;padding:7px 5px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:rgba(5,12,22,.92);backdrop-filter:blur(20px);box-shadow:0 14px 45px rgba(0,0,0,.4);transform:translateY(130%);opacity:0;pointer-events:none;transition:transform .28s ease,opacity .28s ease}
        .mobile-bottom-nav.visible{transform:translateY(0);opacity:1;pointer-events:auto}
        .mobile-bottom-nav a{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:7px 2px;border-radius:14px;color:var(--muted);text-decoration:none;font-size:.62rem;font-weight:700;white-space:nowrap}
        .mobile-bottom-nav a .nav-icon{font-size:1.05rem;line-height:1}
        .mobile-bottom-nav a.active{color:var(--text);background:rgba(98,168,255,.12)}
        .mobile-bottom-nav a.active .nav-icon{color:var(--accent)}
      }
    `;
    document.head.appendChild(style);

    let lastY = window.scrollY;
    const updateBottomNav = () => {
      const y = window.scrollY;
      if (y > 100) bottomNav.classList.add('visible');
      else bottomNav.classList.remove('visible');
      lastY = y;
    };
    window.addEventListener('scroll', updateBottomNav, { passive: true });
    updateBottomNav();
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
