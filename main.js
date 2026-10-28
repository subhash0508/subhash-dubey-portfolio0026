const CONFIG=window.PORTFOLIO_CONFIG||{};
const ring=document.querySelector('.cursor-ring'),dot=document.querySelector('.cursor-dot');
let mx=-100,my=-100,rx=-100,ry=-100;
document.addEventListener('pointermove',e=>{
  mx=e.clientX; my=e.clientY;
  document.documentElement.style.setProperty('--mx',mx+'px');
  document.documentElement.style.setProperty('--my',my+'px');
});
(function cursorLoop(){
  rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
  if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}
  if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}
  requestAnimationFrame(cursorLoop);
})();
document.querySelectorAll('a,button,.tool,.workflow>div,.float-icon,.portrait,.showreel,.resume').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(ring){ring.style.width='54px';ring.style.height='54px';ring.style.background='rgba(255,255,255,.05)';ring.style.borderColor='rgba(255,255,255,.8)'}});
  el.addEventListener('mouseleave',()=>{if(ring){ring.style.width='34px';ring.style.height='34px';ring.style.background='transparent';ring.style.borderColor='rgba(255,255,255,.55)'}});
});
// Hero tool icons: click to zoom/highlight one icon without moving or stretching the portrait.
document.querySelectorAll('.hero-tool').forEach(icon=>{
  const toggle=()=>{
    document.querySelectorAll('.hero-tool.is-zoomed').forEach(x=>{if(x!==icon)x.classList.remove('is-zoomed')});
    icon.classList.toggle('is-zoomed');
  };
  icon.addEventListener('click',e=>{e.stopPropagation();toggle();});
  icon.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();toggle();}
  });
});
document.addEventListener('click',e=>{
  if(!e.target.closest('.hero-tool')){
    document.querySelectorAll('.hero-tool.is-zoomed').forEach(x=>x.classList.remove('is-zoomed'));
  }
});
const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll('.section,.timeline article,.workflow>div,.tool,.showreel,.resume,.skill-block').forEach(x=>{x.classList.add('reveal');io.observe(x)});

// AI tools: select one tool at a time with a single highlight effect.
document.querySelectorAll('.ai-grid .tool').forEach(card=>{
  card.setAttribute('tabindex','0');
  const toggle=()=>{
    document.querySelectorAll('.ai-grid .tool.selected').forEach(x=>{if(x!==card)x.classList.remove('selected')});
    card.classList.toggle('selected');
  };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});

document.querySelectorAll('.workflow>div').forEach(card=>{
  card.setAttribute('tabindex','0');
  const toggle=()=>{ card.classList.toggle('selected'); };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});


// Click-to-glow interaction for experience cards
document.querySelectorAll('.timeline article').forEach(card=>{
  card.setAttribute('tabindex','0');
  const toggle=()=>{
    document.querySelectorAll('.timeline article.selected').forEach(x=>{if(x!==card)x.classList.remove('selected')});
    card.classList.toggle('selected');
  };
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});


// Navigation: filled rectangle active state + mobile menu
const navLinks=[...document.querySelectorAll('.navlinks a, .mobile-menu a')];
const sections=[...document.querySelectorAll('main section[id]')];
function setActive(id){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));}
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id);});
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>sectionObserver.observe(s));
const menuToggle=document.querySelector('.menu-toggle'), mobileMenu=document.querySelector('.mobile-menu');
function closeMenu(){if(!mobileMenu)return;mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true');menuToggle?.setAttribute('aria-expanded','false');}
menuToggle?.addEventListener('click',()=>{const open=!mobileMenu.classList.contains('open');mobileMenu.classList.toggle('open',open);mobileMenu.setAttribute('aria-hidden',String(!open));menuToggle.setAttribute('aria-expanded',String(open));});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu()});
