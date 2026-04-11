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
  
  console.log('main.js executado com sucesso');
});
