'use strict';
(function(){
  const reduced=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang=()=>document.documentElement.lang==='es'?'es':'en';
  const monthNames={en:['Jan','Feb','Mar'],es:['Ene','Feb','Mar']};
  const money=(value)=>{
    const valueString=new Intl.NumberFormat(lang()==='es'?'es-ES':'en-CA',{maximumFractionDigits:0}).format(Math.abs(Math.round(value)));
    return 'CA$'+valueString;
  };
  const signed=(value)=>value<0?'−'+money(value):value>0?'+'+money(value):money(0);

  /* Before/after sample: native range is accessible by touch and keyboard. */
  document.querySelectorAll('[data-excel-compare]').forEach(compare=>{
    const range=compare.querySelector('[data-excel-range]');
    const stage=compare.querySelector('.compare-stage');
    if(!range||!stage)return;
    const sync=()=>{
      const value=Math.min(100,Math.max(0,Number(range.value)||0));
      stage.style.setProperty('--split',value+'%');
      stage.dataset.ready='true';
      range.setAttribute('aria-valuetext',lang()==='es'
        ? value+'% de datos originales, '+(100-value)+'% de datos limpios'
        : value+'% before, '+(100-value)+'% after');
      range.setAttribute('aria-label',lang()==='es'?'Comparar Excel antes y después':'Compare Excel before and after');
    };
    range.addEventListener('input',sync,{passive:true});
    document.addEventListener('portfolio:languagechange',sync);
    sync();
  });

  /* Project spotlight: progressive enhancement. Both projects stay visible
   * if JavaScript does not run; controls never auto-advance. */
  const work=document.querySelector('#work');
  if(work){
    const projects=[...work.querySelectorAll(':scope > .project')];
    const controls=work.querySelector('[data-spotlight-controls]');
    if(controls&&projects.length>=2){
      const buttons=[...controls.querySelectorAll('[data-spotlight-target]')];
      const position=controls.querySelector('[data-spotlight-position]');
      let current=0;
      let busy=false;
      const apply=(index)=>{
        projects.forEach((article,i)=>{
          article.hidden=i!==index;
          article.setAttribute('aria-hidden',String(i!==index));
        });
        buttons.forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.spotlightTarget)===index)));
        if(position)position.textContent=String(index+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');
      };
      const change=async(next)=>{
        if(busy||next===current||next<0||next>=projects.length)return;
        busy=true;
        const outgoing=projects[current];
        const incoming=projects[next];
        const canAnimate=!reduced()&&typeof outgoing.animate==='function';
        if(canAnimate){
          try{await outgoing.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:150,easing:'ease-in',fill:'forwards'}).finished;}catch(_){}
        }
        outgoing.getAnimations?.().forEach(a=>a.cancel());
        current=next;
        apply(next);
        if(canAnimate){
          const animation=incoming.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
          try{await animation.finished;}catch(_){}
        }
        busy=false;
      };
      buttons.forEach(btn=>btn.addEventListener('click',()=>change(Number(btn.dataset.spotlightTarget))));
      controls.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
        const active=document.activeElement;
        const index=buttons.indexOf(active);
        if(index<0)return;
        event.preventDefault();
        const next=(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
        buttons[next].focus();
        change(Number(buttons[next].dataset.spotlightTarget));
      });
      const updateA11y=()=>controls.querySelector('[data-spotlight-group]')?.setAttribute('aria-label',lang()==='es'?'Seleccionar proyecto destacado':'Choose featured project');
      work.classList.add('spotlight-ready');
      controls.hidden=false;
      apply(0);
      updateA11y();
      document.addEventListener('portfolio:languagechange',updateA11y);
    }
  }

  /* No layout-blocking scroll handler, no continuous animation. */
  const process=document.querySelector('.process');
  if(process){
    if(!('IntersectionObserver' in window)||reduced())process.classList.add('timeline-active');
    else {
      const observer=new IntersectionObserver(entries=>{
        for(const entry of entries){
          if(!entry.isIntersecting)continue;
          process.classList.add('timeline-active');
          observer.unobserve(process);
        }
      },{threshold:.16});
      observer.observe(process);
    }
  }
})();
