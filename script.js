/* =====================================================
   LUXELAND INVESTIMATE LTD — script.js
   ===================================================== */

// ===== NAVBAR ACTIVE LINK =====
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
})();

// ===== MOBILE MENU TOGGLE =====
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}
function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ===== PER-SLIDE HERO MESSAGES =====
const slideMessages = [
  {
    badge:    '🏡 Title Deed Is Our Language',
    title:    'Your Trusted<br>Land & <em>Property</em><br>Partner',
    subtitle: 'Discover premium land and properties across Kenya. We make investing simple, secure, and rewarding.',
    btn1:     { text: 'Browse Properties →', href: 'properties.html', cls: 'btn btn-red' },
    btn2:     { text: 'Schedule a Call',      href: 'contact.html',    cls: 'btn btn-outline' },
  },
  {
    badge:    '💰 Affordable Payment Plans',
    title:    'Own Land from<br>as Low as <em>KSH 299K</em>',
    subtitle: 'Flexible payment options make land ownership possible for everyone — start your journey today with a small deposit.',
    btn1:     { text: 'See All Plots →',      href: 'properties.html', cls: 'btn btn-red' },
    btn2:     { text: 'WhatsApp Us',          href: 'https://wa.me/254710520656', cls: 'btn btn-outline' },
  },
  {
    badge:    '📜 100% Verified Titles',
    title:    'Safe, Legal &<br><em>Title Deed</em><br>Ready Plots',
    subtitle: 'Every property we sell comes with a fully verified title deed. No disputes, no hidden charges — just peace of mind.',
    btn1:     { text: 'View Properties →',   href: 'properties.html', cls: 'btn btn-red' },
    btn2:     { text: 'Learn More',           href: 'about.html',      cls: 'btn btn-outline' },
  },
  {
    badge:    '🌍 Diaspora Investment',
    title:    'Invest in Kenya<br>From <em>Anywhere</em><br>in the World',
    subtitle: 'Living abroad? We handle everything for you — site visits, documentation, and transfer. Your investment, secured.',
    btn1:     { text: 'Diaspora Services →', href: 'diaspora.html',   cls: 'btn btn-red' },
    btn2:     { text: 'Talk to an Agent',    href: 'contact.html',    cls: 'btn btn-outline' },
  },
  {
    badge:    '🏗️ Prime Locations',
    title:    'Plots in 30+<br>Prime <em>Locations</em><br>Across Kenya',
    subtitle: 'From Kitengela to Nanyuki, Isinya to Juja — we have strategically located plots ready for development.',
    btn1:     { text: 'Explore Locations →', href: 'properties.html', cls: 'btn btn-red' },
    btn2:     { text: 'Free Site Visit',     href: 'contact.html',    cls: 'btn btn-outline' },
  },
  {
    badge:    '🤝 We Deliver What We Promise',
    title:    '1,200+ Happy<br>Clients &<br><em>500+ Plots</em> Sold',
    subtitle: 'Join thousands of satisfied investors who made Luxeland their trusted real estate partner in Kenya.',
    btn1:     { text: 'Read Testimonials →', href: 'testimonials.html', cls: 'btn btn-red' },
    btn2:     { text: 'Get Started',          href: 'contact.html',      cls: 'btn btn-outline' },
  },
];

// ===== HERO SLIDESHOW =====
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const titleEl    = document.getElementById('heroTitle');
  const subtitleEl = document.getElementById('heroSubtitle');
  const badgeEl    = document.getElementById('heroBadge');
  const btnsEl     = document.getElementById('heroBtns');

  if (!slides.length) return;

  let currentSlide = 0;
  const total = slides.length;

  function updateContent(n) {
    if (!titleEl) return;
    const m = slideMessages[n] || slideMessages[0];

    // Fade out
    const content = document.getElementById('heroContent');
    if (content) { content.style.opacity = '0'; content.style.transform = 'translateY(16px)'; }

    setTimeout(() => {
      badgeEl.innerHTML    = m.badge;
      titleEl.innerHTML    = m.title;
      subtitleEl.innerHTML = m.subtitle;
      btnsEl.innerHTML     = `<a href="${m.btn1.href}" class="${m.btn1.cls}">${m.btn1.text}</a>
                               <a href="${m.btn2.href}" class="${m.btn2.cls}">${m.btn2.text}</a>`;
      // Fade in
      if (content) { content.style.opacity = '1'; content.style.transform = 'translateY(0)'; }
    }, 350);
  }

  window.goSlide = function (n) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (n + total) % total;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    updateContent(currentSlide);
  };

  // Init first message
  updateContent(0);

  setInterval(() => goSlide(currentSlide + 1), 2800);
})();

// ===== PROPERTY FILTER =====
function filterProps(cat, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#propsGrid .prop-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}

// ===== CONTACT FORM =====
function submitForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
}