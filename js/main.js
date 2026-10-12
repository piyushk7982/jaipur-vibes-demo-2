(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var h=$('.site-header'),t=$('.nav-toggle'),n=$('#nav'),sb=$('.sub-btn');
/* social links from js/config.js (no fake URLs: hidden until configured) */
var C=(window.JV_CONFIG||{}).social||{};
$$('[data-social]').forEach(function(a){var u=C[a.dataset.social];if(u&&/^https:\/\//.test(u)){a.href=u;a.hidden=false}});
/* header */
function sc(){h.classList.toggle('scrolled',window.scrollY>30)}sc();window.addEventListener('scroll',sc,{passive:true});
function menu(o){n.classList.toggle('open',o);t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu')}
t.addEventListener('click',function(){menu(!n.classList.contains('open'))});
sb.addEventListener('click',function(){var p=sb.parentNode,o=!p.classList.contains('open');p.classList.toggle('open',o);sb.setAttribute('aria-expanded',o)});
$$('#nav a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
document.addEventListener('click',function(e){if(!sb.parentNode.contains(e.target)){sb.parentNode.classList.remove('open');sb.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){menu(false);sb.parentNode.classList.remove('open');sb.setAttribute('aria-expanded','false');closeLb()}});
var y=$('#yr');if(y)y.textContent=new Date().getFullYear();
/* scroll reveal with stagger */
var r=$$('.reveal');
if('IntersectionObserver' in window&&!rm){
 r.forEach(function(el){var k=$$('.reveal',el.parentNode).filter(function(x){return x.parentNode===el.parentNode}).indexOf(el);if(k>0)el.style.transitionDelay=Math.min(k,5)*90+'ms'});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(function(){el.style.transitionDelay=''},1600)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 r.forEach(function(x){io.observe(x)})
}else r.forEach(function(x){x.classList.add('in')});
/* subtle parallax (desktop only) */
var px=$$('.reveal>.round');
if(px.length&&!rm&&window.matchMedia('(min-width:901px)').matches){var tk=false;
 function pp(){tk=false;px.forEach(function(i){var b=i.parentNode.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;i.style.setProperty('--py',((b.top+b.height/2-innerHeight/2)*-.05).toFixed(1)+'px')})}
 window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(pp)}},{passive:true});pp()}
/* hero slider */
var hs=$('.hs');
if(hs){
 var sl=$$('.hs-slide',hs),dots=$$('.hs-dot',hs),pb=$('.hs-pause',hs),i=0,tm=null,paused=rm,hov=false;
 function go(k){i=(k+sl.length)%sl.length;sl.forEach(function(s,j){s.classList.toggle('on',j===i);s.setAttribute('aria-hidden',j!==i)});dots.forEach(function(d,j){d.setAttribute('aria-current',j===i)})}
 function stop(){clearInterval(tm);tm=null}
 function start(){stop();if(!paused&&!hov&&!document.hidden)tm=setInterval(function(){go(i+1)},4800)}
 $('.hs-prev',hs).onclick=function(){go(i-1);start()};$('.hs-next',hs).onclick=function(){go(i+1);start()};
 dots.forEach(function(d,j){d.onclick=function(){go(j);start()}});
 function lbl(){pb.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');pb.setAttribute('aria-pressed',paused)}lbl();
 pb.onclick=function(){paused=!paused;lbl();start()};
 hs.addEventListener('mouseenter',function(){hov=true;stop()});hs.addEventListener('mouseleave',function(){hov=false;start()});
 hs.addEventListener('focusin',function(){hov=true;stop()});hs.addEventListener('focusout',function(){hov=false;start()});
 document.addEventListener('visibilitychange',start);
 var sx=0,sy=0;hs.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;hov=true;stop()},{passive:true});
 hs.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))go(dx<0?i+1:i-1);hov=false;start()},{passive:true});
 hs.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){go(i-1);start()}if(e.key==='ArrowRight'){go(i+1);start()}});
 go(0);start();
}
/* gallery filter + lightbox */
var g=$('#gal'),lb,items=[],cur=0,last=null;
function vis(){return items.filter(function(a){return a.style.display!=='none'})}
function show(k){var v=vis();cur=(k+v.length)%v.length;var a=v[cur],im=$('img',lb);im.src=a.href;im.alt=$('img',a).alt;$('figcaption',lb).textContent=a.dataset.cap;lb.classList.add('on');setTimeout(function(){$('.x',lb).focus()},50)}
function closeLb(){if(lb&&lb.classList.contains('on')){lb.classList.remove('on');if(last)last.focus()}}
if(g){
 items=$$('.gitem',g);var chips=$$('.chip');chips[0].setAttribute('aria-pressed','true');
 chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed','false')});c.setAttribute('aria-pressed','true');items.forEach(function(a){a.style.display=(c.dataset.f==='all'||a.dataset.c===c.dataset.f)?'':'none'})})});
 lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image viewer');
 lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous image">&#8249;</button><figure><img alt="" width="600" height="800"><figcaption></figcaption></figure><button class="n" aria-label="Next image">&#8250;</button>';document.body.appendChild(lb);
 items.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();last=a;show(vis().indexOf(a))})});
 $('.x',lb).onclick=closeLb;$('.p',lb).onclick=function(){show(cur-1)};$('.n',lb).onclick=function(){show(cur+1)};
 lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
 document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
}
})();
