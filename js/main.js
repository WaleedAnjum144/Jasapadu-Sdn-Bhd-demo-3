var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var menu=$('#menu'),links=$('#links');
menu.onclick=function(){var o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o)};
links.onclick=function(e){if(e.target.tagName==='A'){links.classList.remove('open');menu.setAttribute('aria-expanded','false')}};
var fb=$$('.filters button'),pj=$$('.pj');
fb.forEach(function(b){b.onclick=function(){fb.forEach(function(x){x.setAttribute('aria-pressed',x===b)});pj.forEach(function(p){p.hidden=!(b.dataset.f==='all'||p.dataset.c===b.dataset.f)})}});
var dlg=$('#dlg');
pj.forEach(function(p){p.onclick=function(){$('img',dlg).src=$('img',p).src;$('img',dlg).alt=$('img',p).alt;$('p',dlg).textContent=$('b',p).textContent+' - '+$('span',p).textContent;dlg.showModal()}});
dlg.onclick=function(e){if(e.target===dlg||e.target.tagName==='BUTTON')dlg.close()};
var ds=$$('details'),rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function run(d,f,t,done){d.style.overflow='hidden';d.a=d.animate({height:[f+'px',t+'px']},{duration:rm?0:420,easing:'cubic-bezier(.2,.7,.2,1)'});d.a.onfinish=function(){d.style.overflow='';d.a=null;done()}}
function stop(d){var f=d.offsetHeight;if(d.a){d.a.onfinish=null;d.a.cancel();d.a=null}return f}
function openD(d){var f=stop(d);d.dataset.o='1';d.open=true;var t=d.offsetHeight;run(d,f,t,function(){})}
function closeD(d){var f=stop(d);d.dataset.o='0';d.open=false;var t=d.offsetHeight;d.open=true;run(d,f,t,function(){d.open=false})}
ds.forEach(function(d){d.dataset.o=d.open?'1':'0';$('summary',d).addEventListener('click',function(e){e.preventDefault();if(d.dataset.o==='1')closeD(d);else{ds.forEach(function(o){if(o!==d&&o.dataset.o==='1')closeD(o)});openD(d)}})});
var f=$('#form');
function bad(el,m){el.setAttribute('aria-invalid','true');el.parentNode.querySelector('.err').textContent=m;return false}
function good(el){el.removeAttribute('aria-invalid');el.parentNode.querySelector('.err').textContent='';return true}
f.onsubmit=function(e){e.preventDefault();var n=$('#name'),p=$('#phone'),m=$('#email'),ok=true;
ok=(n.value.trim().length>1?good(n):bad(n,'Enter your name.'))&&ok;
ok=(/^[+0-9()\s-]{8,}$/.test(p.value.trim())?good(p):bad(p,'Enter a valid phone number.'))&&ok;
ok=(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value.trim())?good(m):bad(m,'Enter a valid email address.'))&&ok;
if(!ok)return;
var b='Name: '+n.value+'\nPhone: '+p.value+'\nEmail: '+m.value+'\nProject: '+$('#type').value+'\n\n'+$('#msg').value;
location.href='mailto:info@jasapadu.com.my?subject='+encodeURIComponent('Enquiry from '+n.value)+'&body='+encodeURIComponent(b);
$('#ok').style.display='block'};
$('#yr').textContent=new Date().getFullYear();

var hd=$('header');addEventListener('scroll',function(){hd.classList.toggle('sc',scrollY>10)},{passive:true});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
$$('section:not(.hero) h2,section:not(.hero) .lead,.facts div,.row .im,.row>div:last-child,.tl li,.pj,.regs div,details,.band .w,form,.info li').forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',(el.matches('.facts div,.pj,.regs div,.tl li')?(i%3)*.12:0)+'s');io.observe(el)})}

var tl=$$('.tl li'),vs=$$('.vb img'),cap=$('#vcap'),cur=0,last=0;
function go(n,u){cur=n;if(u)last=Date.now();tl.forEach(function(l,i){l.classList.toggle('on',i===n)});vs.forEach(function(v,i){v.classList.toggle('on',i===n)});cap.innerHTML='Step '+(n+1)+' of 5<b>'+$('h3',tl[n]).textContent+'</b>'+$('p',tl[n]).textContent}
tl.forEach(function(l,i){['mouseenter','focus','click'].forEach(function(ev){l.addEventListener(ev,function(){go(i,true)})})});
go(0);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){if(Date.now()-last>7000)go((cur+1)%tl.length)},3500);
