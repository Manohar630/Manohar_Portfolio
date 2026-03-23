/* ══════════════════════════════════════════
   MANOHAR PORTFOLIO – JAVASCRIPT
   ══════════════════════════════════════════ */

'use strict';

// ── LOADER ──────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initCounters();
  }, 1900);
  document.body.style.overflow = 'hidden';
});

// ── TYPEWRITER for hero role ────────────────────────────
const roleEl = document.getElementById('role-typed');
const roles  = ['AI/ML Models', 'Web Applications', 'Data Pipelines', 'Creative Content'];
let rIdx = 0, charIdx = 0, deleting = false;

function typeRole() {
  const word = roles[rIdx];
  if (!deleting) {
    roleEl.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeRole, 1600); // pause before deleting
      return;
    }
    setTimeout(typeRole, 80);
  } else {
    roleEl.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 40);
  }
}
setTimeout(typeRole, 1200); // start after loader

// ── NAVBAR ───────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  allNavLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── PARTICLES ────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width:  ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay:    ${Math.random() * 5}s;
      opacity: ${Math.random() * 0.5 + 0.1};
      background: ${Math.random() > 0.5 ? 'var(--accent)' : 'var(--primary)'};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── ANIMATE ON SCROLL ─────────────────────────────
const aosEls = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, i * 80);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
aosEls.forEach(el => aosObserver.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────
function initCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      el.textContent = Math.round(ease * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

// ── SKILL BARS ────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-panel').forEach(p => skillObserver.observe(p));

// ── SKILL TABS ────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.skills-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const target = document.getElementById('tab-' + tab);
    if (target) {
      target.classList.add('active');
      // Animate bars in newly visible panel
      setTimeout(() => {
        target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 30);
          });
        });
      }, 50);
    }
  });
});

// ── PROJECT FILTER ────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = match ? '' : 'none';
        if (match) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        }
      }, 200);
    });
  });
});

// ── SMOOTH CARD TRANSITIONS ───────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.style.transition = 'opacity 0.3s ease, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
});

// ── CONTACT FORM ──────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    submitBtn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1500);
});

// ── BACK TO TOP ───────────────────────────────────
document.querySelector('.back-top')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── TYPED TEXT EFFECT for hero code ──────────────
// Already handled by CSS animation

// ── TILT EFFECT on profile card ──────────────────
const profileOrbit = document.querySelector('.profile-orbit');
if (profileOrbit && window.innerWidth > 768) {
  document.querySelector('.hero-visual')?.addEventListener('mousemove', (e) => {
    const rect = profileOrbit.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    profileOrbit.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
    profileOrbit.style.transition = 'transform 0.1s ease';
  });
  document.querySelector('.hero-visual')?.addEventListener('mouseleave', () => {
    profileOrbit.style.transform = '';
    profileOrbit.style.transition = 'transform 0.5s ease';
  });
}

// ── GLOWING SKILL CARDS on hover ─────────────────
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const iconEl = card.querySelector('.skill-icon i');
    if (iconEl) {
      iconEl.style.transform = 'scale(1.2) rotate(-5deg)';
      iconEl.style.transition = 'transform 0.3s ease';
    }
  });
  card.addEventListener('mouseleave', () => {
    const iconEl = card.querySelector('.skill-icon i');
    if (iconEl) {
      iconEl.style.transform = '';
    }
  });
});

// ── TIMELINE REVEAL ───────────────────────────────
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 120);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => {
  const isLeft = item.classList.contains('left');
  item.style.opacity = '0';
  item.style.transform = isLeft ? 'translateX(-40px)' : 'translateX(40px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

console.log('%c👋 Hey there, fellow developer!', 'color:#6c63ff;font-size:1.2rem;font-weight:bold');
console.log('%cBuilt with passion by Manohar Sirasani 🚀', 'color:#00d9ff;font-size:0.9rem');
console.log('%cgithub.com/Manohar630', 'color:#9b9bbf;font-size:0.85rem');
