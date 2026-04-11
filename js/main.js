gsap.registerPlugin(ScrollTrigger);

// ── CURSOR ──
const cur=document.getElementById('cur'),ring=document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;gsap.to(cur,{x:mx,y:my,duration:.06})});
(function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;gsap.set(ring,{x:rx,y:ry});requestAnimationFrame(loop)})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>gsap.to(ring,{width:52,height:52,opacity:.75,duration:.3}));
  el.addEventListener('mouseleave',()=>gsap.to(ring,{width:34,height:34,opacity:.45,duration:.3}));
});

// ── THEME ──
const root=document.documentElement;
const tbtn=document.getElementById('tbtn');
root.setAttribute('data-theme',localStorage.getItem('theme')||'light');
tbtn.addEventListener('click',()=>{
  const n=root.getAttribute('data-theme')==='light'?'dark':'light';
  root.setAttribute('data-theme',n);localStorage.setItem('theme',n);
});

// ── NAV ──
const nav=document.getElementById('nav');
ScrollTrigger.create({start:60,onUpdate:s=>nav.classList.toggle('s',s.progress>0)});

// ── HERO SEQUENCE ──
// Ordem: "Raquel" sobe → "Ollier" sobe (overlap) → tagline fade-up → badges → scroll hint → navLogo
gsap.timeline({delay:.25})
  .to('#w1',{y:'0%',opacity:1,duration:1.05,ease:'expo.out'})
  .to('#w2',{y:'0%',opacity:1,duration:1.05,ease:'expo.out'},'-=.65')
  .to('#htag',{opacity:1,y:0,duration:.85,ease:'power3.out'},'-=.3')
  .to('#hbdg',{opacity:1,y:0,duration:.75,ease:'power3.out'},'-=.6')
  .to('#hscroll',{opacity:1,duration:.55},'-=.35')
  .to('#navLogo',{opacity:1,duration:.45},'-=.3');

// ── SCROLL REVEALS ──
const srOpts=(x,y,s)=>({
  opacity:0,x:x||0,y:y||0,scale:s||1,
});
gsap.utils.toArray('.sr').forEach(el=>
  gsap.fromTo(el,{opacity:0,y:48},{opacity:1,y:0,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'}})
);
gsap.utils.toArray('.sr-l').forEach(el=>
  gsap.fromTo(el,{opacity:0,x:-46},{opacity:1,x:0,duration:.95,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'}})
);
gsap.utils.toArray('.sr-r').forEach(el=>
  gsap.fromTo(el,{opacity:0,x:46},{opacity:1,x:0,duration:.95,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'}})
);
gsap.utils.toArray('.sr-s').forEach(el=>
  gsap.fromTo(el,{opacity:0,scale:.92},{opacity:1,scale:1,duration:.95,ease:'back.out(1.3)',
    scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'}})
);

// atuacao items stagger
gsap.utils.toArray('.aitem').forEach((el,i)=>{
  ScrollTrigger.create({trigger:el,start:'top 90%',
    onEnter:()=>gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.65,delay:i*.06,ease:'power3.out'})
  });
});
