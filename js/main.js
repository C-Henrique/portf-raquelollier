/* ═══════════════════════════════════════════════════════════
   main.js — Raquel Ollier Portfolio
   1. Setup GSAP
   2. Cursor (desktop only)
   3. Tema
   4. Nav scroll
   5. Hero sequence
   6. Scroll reveals
   7. Atuação stagger
══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ─── 1. CURSOR — apenas em dispositivos com mouse ─── */
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  const cur = document.getElementById('cur');
  const ring = document.getElementById('ring');

  if (!isTouchDevice) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cur, { x: mx, y: my, duration: .06 });
    });

    (function loop() {
      rx += (mx - rx) * .1;
      ry += (my - ry) * .1;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(ring, { width: 52, height: 52, opacity: .75, duration: .3 }));
      el.addEventListener('mouseleave', () => gsap.to(ring, { width: 34, height: 34, opacity: .45, duration: .3 }));
    });
  } else {
    if (cur) cur.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  /* ─── 2. TEMA ─── */
  const tbtn = document.getElementById('tbtn');
  tbtn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ─── 3. NAV ─── */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 60,
    onUpdate: self => nav.classList.toggle('s', self.progress > 0),
  });

  /* ─── 4. HERO SEQUENCE ─── */
  gsap.timeline({ delay: .25 })
    .to('#w1', { y: '0%', opacity: 1, duration: 1.05, ease: 'expo.out' })
    .to('#w2', { y: '0%', opacity: 1, duration: 1.05, ease: 'expo.out' }, '-=.65')
    .to('#htag', { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.3')
    .to('#hbdg', { opacity: 1, y: 0, duration: .75, ease: 'power3.out' }, '-=.6')
    .to('#hscroll', { opacity: 1, duration: .55 }, '-=.35')
    .to('#navLogo', { opacity: 1, duration: .45 }, '-=.3');

  /* ─── 5. SCROLL REVEALS ─── */
  gsap.utils.toArray('.sr').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      }
    )
  );
  gsap.utils.toArray('.sr-l').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, x: -46 },
      {
        opacity: 1, x: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      }
    )
  );
  gsap.utils.toArray('.sr-r').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, x: 46 },
      {
        opacity: 1, x: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      }
    )
  );
  gsap.utils.toArray('.sr-s').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, scale: .92 },
      {
        opacity: 1, scale: 1, duration: .95, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
      }
    )
  );

  /* ─── 6. ATUAÇÃO — stagger por item ─── */
  gsap.utils.toArray('.aitem').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      onEnter: () => gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .65, delay: i * .06, ease: 'power3.out' }
      ),
    });
  });

  /* ─── 7. MENU HAMBÚRGUER (mobile) ─── */
  const hbtn    = document.getElementById('hbtn');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    hbtn.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('open');
    hbtn.setAttribute('aria-expanded', 'true');
    hbtn.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  window.closeMenu = function() {
    hbtn.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    hbtn.setAttribute('aria-expanded', 'false');
    hbtn.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  };

  hbtn.addEventListener('click', () => {
    hbtn.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Fecha menu com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hbtn.classList.contains('open')) closeMenu();
  });

  /* ─── 8. SCROLL SUAVE NOS LINKS (compatível com iOS Safari) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── 10. NAVEGAÇÃO POR SCROLL NAS ATUAÇÕES ─── */
  document.querySelectorAll('.aitem').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.aitem').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  });

  /* ─── 11. CASES GROUP REVEAL ─── */
  gsap.utils.toArray('.cases-group').forEach((section, i) => {
    const header = section.querySelector('.cases-group-header');
    if (!header) return;
    
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* ─── 12. CASES GROUP SCROLL HIGHLIGHT (Desktop only) ─── */
  if (window.matchMedia('(min-width: 769px)').matches) {
    document.querySelectorAll('.cases-group').forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        end: 'bottom 80%',
        onEnter: () => section.classList.add('scrolled'),
        onLeave: () => section.classList.remove('scrolled'),
        onEnterBack: () => section.classList.add('scrolled'),
        onLeaveBack: () => section.classList.remove('scrolled'),
      });
    });
  }

  // Funções do Modal de Imagem
  window.openImageModal = function(el) {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (!img) return;

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeImageModal = function(event) {
    // Se for o próprio modal ou o botão de fechar
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
      return;
    }

    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Fechar com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('image-modal');
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      const videoModal = document.getElementById('video-modal');
      if (videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
    }
  });

  /* ─── VÍDEO: Hover (Desktop) ─── */
  const isMobile = window.matchMedia('(hover: none)').matches;
  
  if (!isMobile) {
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
      const video = wrapper.querySelector('.case-video');
      
      wrapper.addEventListener('mouseenter', () => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      });
      
      wrapper.addEventListener('mouseleave', () => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    });
  }

  /* ─── MODAL DE VÍDEO ─── */
  window.openVideoModal = function(wrapper) {
    const video = wrapper.querySelector('.case-video');
    if (!video) return;

    const modal = document.getElementById('video-modal') || createVideoModal();
    const modalVideo = modal.querySelector('.modal-video');
    
    modalVideo.src = video.querySelector('source').src;
    modalVideo.poster = video.poster;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function createVideoModal() {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.onclick = closeVideoModal;
    modal.innerHTML = `
      <button class="modal-close" onclick="closeVideoModal(event)">&times;</button>
      <div class="modal-content">
        <video class="modal-video" oncontextmenu="return false;" controls controlsList="nodownload" autoplay muted playsinline disablePictureInPicture></video>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  window.closeVideoModal = function(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
      return;
    }
    const modal = document.getElementById('video-modal');
    const video = modal?.querySelector('.modal-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  };
});