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

document.addEventListener('DOMContentLoaded', function() {
  
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
  const cur  = document.getElementById('cur');
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
    if (cur)  cur.style.display  = 'none';
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
    .to('#w1',      { y: '0%',  opacity: 1, duration: 1.05, ease: 'expo.out' })
    .to('#w2',      { y: '0%',  opacity: 1, duration: 1.05, ease: 'expo.out' },   '-=.65')
    .to('#htag',    { opacity: 1, y: 0,     duration: .85,  ease: 'power3.out' }, '-=.3')
    .to('#hbdg',    { opacity: 1, y: 0,     duration: .75,  ease: 'power3.out' }, '-=.6')
    .to('#hscroll', { opacity: 1,           duration: .55 },                      '-=.35')
    .to('#navLogo', { opacity: 1,           duration: .45 },                      '-=.3');

  /* ─── 5. SCROLL REVEALS ─── */
  gsap.utils.toArray('.sr').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } }
    )
  );
  gsap.utils.toArray('.sr-l').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, x: -46 },
      { opacity: 1, x: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } }
    )
  );
  gsap.utils.toArray('.sr-r').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, x: 46 },
      { opacity: 1, x: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } }
    )
  );
  gsap.utils.toArray('.sr-s').forEach(el =>
    gsap.fromTo(el,
      { opacity: 0, scale: .92 },
      { opacity: 1, scale: 1, duration: .95, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } }
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

  /* ─── 7. LIGHTBOX — Cases de Sucesso (Desktop) ─── */
  // isTouchDevice já foi declarado na linha 27
  
  if (!isTouchDevice) {
    // Desktop: Lightbox ao clicar na imagem
    const caseImgWrappers = document.querySelectorAll('.case-img-wrapper');
    const lightbox = document.createElement('div');
    lightbox.className = 'case-lightbox';
    document.body.appendChild(lightbox);

    const casesData = [
      { image: 'img/grid-insta.jpeg', alt: 'Grid Instagram - Fortalecimento de posicionamento', tag: 'Posicionamento & Autoridade' },
      { image: 'img/planejamento-doc.jpeg', alt: 'Planejamento estratégico - Estruturação de marca', tag: 'Expansão de Posicionamento' },
      { image: null, alt: 'Estrutura Operacional', tag: 'Estrutura Operacional' }
    ];

    let currentCaseIndex = 0;

    function createLightboxContent(index) {
      const caseData = casesData[index];
      const imageHTML = caseData.image 
        ? `<img src="${caseData.image}" alt="${caseData.alt}">`
        : `<svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`;

      return `
        <button class="lightbox-close" aria-label="Fechar">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Anterior">&#8249;</button>
        <button class="lightbox-nav lightbox-next" aria-label="Próximo">&#8250;</button>
        <div class="lightbox-content" data-current="${index}">
          <div class="lightbox-img">${imageHTML}</div>
        </div>
        <div class="lightbox-counter">${index + 1} / ${casesData.length}</div>
      `;
    }

    function openLightbox(index) {
      currentCaseIndex = index;
      lightbox.innerHTML = createLightboxContent(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
      lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
      currentCaseIndex = (currentCaseIndex + direction + casesData.length) % casesData.length;
      lightbox.innerHTML = createLightboxContent(currentCaseIndex);
      
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
      lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    caseImgWrappers.forEach((wrapper, index) => {
      wrapper.addEventListener('click', () => openLightbox(index));
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
  
  console.log('main.js executado com sucesso');
});