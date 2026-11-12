'use strict';
(function(){
  if(!('IntersectionObserver' in window)||!window.matchMedia||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const targets=document.querySelectorAll('.story-board,.offer,.steps>div,.project,.sample,.proof-strip>div,.case-meta>div,.case-body>section,.section-head');
  if(!targets.length)return;
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.add('motion-entered');
      observer.unobserve(entry.target);
    }
  },{threshold:0.06,rootMargin:'0px 0px -18px 0px'});
  targets.forEach((el,i)=>{el.style.setProperty('--motion-delay',(i%3)*55+'ms');observer.observe(el)});
})();
