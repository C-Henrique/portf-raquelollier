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

  console.log('main.js carregando...');
  console.log('gsap existe:', typeof gsap);
  console.log('ScrollTrigger existe:', typeof ScrollTrigger);

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP ou ScrollTrigger não carregou!');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP registrado com sucesso');

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

  /* ─── 9. FORMULÁRIO DE CONTATO ─── */
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('cfFeedback');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.cf-submit');

      // Validação simples
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });
      const emailField = form.querySelector('#cf-email');
      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) {
        feedback.textContent = 'Preencha todos os campos corretamente.';
        feedback.className = 'cf-feedback err';
        return;
      }

      // Envia via mailto como fallback simples (sem backend)
      const nome    = form.querySelector('#cf-nome').value.trim();
      const email   = form.querySelector('#cf-email').value.trim();
      const msg     = form.querySelector('#cf-msg').value.trim();
      const subject = encodeURIComponent('Contato via portfólio — ' + nome);
      const body    = encodeURIComponent(
        'Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + msg
      );

      btn.disabled = true;
      btn.querySelector('.cf-submit-label').textContent = 'Enviando...';

      // Tenta abrir client de e-mail
      window.location.href = 'mailto:contato@raquelollier.com?subject=' + subject + '&body=' + body;

      // Feedback visual após 800ms
      setTimeout(() => {
        feedback.textContent = 'Mensagem preparada! Confirme o envio no seu app de e-mail.';
        feedback.className = 'cf-feedback ok';
        btn.disabled = false;
        btn.querySelector('.cf-submit-label').textContent = 'Enviar mensagem';
        form.reset();
      }, 800);
    });

    // Remove erro ao digitar
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }

    // Funções do Modal de Imagem
  window.openImageModal = function(wrapper) {
    const img = wrapper.querySelector('img');
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
    }
  });
});