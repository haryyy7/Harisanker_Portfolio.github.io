/* ================================================
   HARISANKER A — PORTFOLIO JAVASCRIPT
   Particles · Typewriter · Scroll animations · Nav
   ================================================ */

'use strict';

/* ===========================
   PARTICLES CANVAS
   =========================== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, animFrame;

  const PARTICLE_COUNT = 70;
  const CYAN  = '0, 217, 255';
  const BLUE  = '59, 130, 246';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a:  Math.random() * 0.5 + 0.15,
      c:  Math.random() > 0.5 ? CYAN : BLUE,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.strokeStyle = `rgba(${CYAN}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c}, ${p.a})`;
      ctx.fill();
    });
    connectParticles();
    animFrame = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  });
})();


/* ===========================
   NAVBAR — SCROLL & MOBILE
   =========================== */
(function initNav() {
  const navbar   = document.getElementById('navbar');
  const hamburger= document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const allLinks = document.querySelectorAll('.nav-link');

  // Scroll behavior
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  // Active link based on scroll
  function updateActiveLink() {
    const sections = ['about','skills','projects','education','looking-for','contact'];
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) link.classList.add('active');
    });
  }

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ===========================
   TYPEWRITER EFFECT
   =========================== */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'AI/ML Engineer',
    'Cloud DevOps Engineer',
    'SaaS Builder and Entrepreneur',
    'Generative AI and Tools',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  const TYPING_SPEED  = 65;
  const DELETE_SPEED  = 35;
  const PAUSE_END     = 2200;
  const PAUSE_START   = 350;

  function type() {
    if (paused) return;

    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; type(); }, PAUSE_END);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        paused = true;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(() => { paused = false; type(); }, PAUSE_START);
        return;
      }
    }

    setTimeout(type, deleting ? DELETE_SPEED : TYPING_SPEED);
  }

  setTimeout(type, 800);
})();


/* ===========================
   SCROLL-TRIGGERED REVEAL
   =========================== */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el, i) => {
    // Stagger delay based on sibling index
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
})();


/* ===========================
   CONTACT FORM — MAILTO
   =========================== */
(function initContactForm() {
  const form  = document.getElementById('contact-form');
  const note  = document.getElementById('form-note');
  const btn   = document.getElementById('contact-submit-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email-field').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      note.textContent = 'Please fill in all fields.';
      note.className   = 'form-note error';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      note.textContent = 'Please enter a valid email address.';
      note.className   = 'form-note error';
      return;
    }

    // Build mailto
    const to   = 'harisankeranil12@gmail.com';
    const body = `Hi Harisanker,\n\nMy name is ${name} (${email}).\n\n${message}`;
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Opening Mail…';

    window.location.href = mailtoUrl;

    setTimeout(() => {
      note.textContent = '✓ Your mail client should open shortly.';
      note.className   = 'form-note success';
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
    }, 1500);
  });
})();


/* ===========================
   SMOOTH ANCHOR SCROLL
   =========================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ===========================
   PROJECT CARD — TILT EFFECT
   =========================== */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `
        translateY(-6px)
        rotateX(${-dy * 4}deg)
        rotateY(${dx  * 4}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ===========================
   SKILL BADGE — HOVER GLOW
   =========================== */
(function initBadgeHover() {
  document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 12px currentColor';
    });
    badge.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
})();


/* ===========================
   NAV LOGO EASTER EGG
   =========================== */
(function initLogoEasterEgg() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  let clicks = 0;
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;
    if (clicks === 5) {
      clicks = 0;
      document.body.style.animation = 'none';
      logo.style.color = `hsl(${Math.random()*360}, 100%, 70%)`;
      setTimeout(() => logo.style.color = '', 1000);
    }
  });
})();


/* ===========================
   OPEN TO WORK BADGE TOOLTIP
   =========================== */
(function initBadgeClick() {
  const badge = document.getElementById('open-to-work-badge');
  if (!badge) return;
  badge.style.cursor = 'pointer';
  badge.title = 'Currently open to full-time, internship & freelance opportunities!';
  badge.addEventListener('click', () => {
    const contact = document.getElementById('contact');
    if (contact) {
      const navH = 70;
      const top = contact.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
})();
