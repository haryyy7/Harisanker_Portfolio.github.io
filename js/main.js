/* ==========================================================================
   HARISANKER A — DEVELOPER PORTFOLIO
   JavaScript: Multilingual Preloader, Smooth Nav, Particle System,
               Scroll Reveal & Interactive Effects
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. MULTILINGUAL PRELOADER ANIMATION
   -------------------------------------------------------------------------- */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const textEl = document.getElementById('preloader-text');
  if (!preloader || !textEl) return;

  const greetings = [
    'Hello',
    'Ciao',
    'Namaste',
    'Bonjour',
    'Olà',
    'Hallo',
    'Guten Tag',
    'Konnichiwa'
  ];

  let currentIndex = 0;
  const intervalTime = 190; // ms per word

  const intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex < greetings.length) {
      textEl.classList.add('fade-swap');
      setTimeout(() => {
        textEl.textContent = greetings[currentIndex];
        textEl.classList.remove('fade-swap');
      }, 65);
    } else {
      clearInterval(intervalId);
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 900);
      }, 200);
    }
  }, intervalTime);
})();

/* --------------------------------------------------------------------------
   2. PARTICLES CANVAS (Deep space subtle ambient particles)
   -------------------------------------------------------------------------- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, animFrame;
  const PARTICLE_COUNT = 32;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.5 ? '139, 92, 246' : '56, 189, 248' // violet or cyan
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();

      // Subtle connection lines between near neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.08;
          ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

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
  }, { passive: true });
})();

/* --------------------------------------------------------------------------
   3. NAVBAR — SCROLL BLUR, MOBILE MENU & ACTIVE LINKS
   -------------------------------------------------------------------------- */
(function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header class toggle
  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveLink();
  }

  // Active link detection based on scroll position
  function highlightActiveLink() {
    const sections = ['about', 'skills', 'projects', 'education', 'contact'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* --------------------------------------------------------------------------
   4. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   -------------------------------------------------------------------------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

/* --------------------------------------------------------------------------
   5. INTERACTIVE 3D TILT ON HERO GRAPHIC (SPLINE STYLE PARALLAX)
   -------------------------------------------------------------------------- */
(function initHeroGraphicTilt() {
  const card = document.querySelector('.hero-graphic-card');
  if (!card) return;

  let isHovered = false;

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    card.style.animationPlayState = 'paused';
  });

  card.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateX = -deltaY * 12;
    const rotateY = deltaX * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
    card.style.transform = '';
    card.style.animationPlayState = 'running';
  });
})();

/* --------------------------------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach((el, index) => {
    const delay = (index % 4) * 0.08;
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
})();
