'use strict';
(function(){
  const form=document.getElementById('inquiry');
  if(!form)return;
  const steps=Array.from(form.querySelectorAll('[data-quote-step]'));
  const markers=Array.from(form.querySelectorAll('[data-quote-progress]'));
  const feedback=form.querySelector('[data-quote-feedback]');
  const summary=Array.from(form.querySelectorAll('[data-quote-value]'));
  if(steps.length!==3||markers.length!==3||!feedback)return;
  let current=0;
  const spanish=()=>document.documentElement.lang==='es';
  const text=(en,es)=>spanish()?es:en;
  const findInvalid=(elements)=>elements.find(el=>{
    if(el.disabled)return false;
    if(el.type==='checkbox')return !el.checked;
    return !String(el.value).trim()||!el.checkValidity();
  });
  const clearInvalid=()=>{
    form.querySelectorAll('[aria-invalid="true"]').forEach(el=>el.removeAttribute('aria-invalid'));
    feedback.textContent='';
  };
  function updateReview(){
    const select=form.querySelector('#f-service');
    const source={
      service:select?.selectedOptions?.[0]?.textContent.trim()||'',
      size:form.querySelector('#f-size')?.value.trim()||'',
      deadline:form.querySelector('#f-deadline')?.value.trim()||'',
      goal:form.querySelector('#f-goal')?.value.trim()||''
    };
    for(const el of summary){
      let value=source[el.dataset.quoteValue]||'';
      if(value.length>220)value=value.slice(0,217)+'…';
      el.textContent=value||text('Not specified','Sin especificar');
    }
  }
  function show(next,focusHeading=false){
    current=Math.max(0,Math.min(2,next));
    steps.forEach((step,i)=>{step.hidden=i!==current;});
    markers.forEach((marker,i)=>{
      if(i===current)marker.setAttribute('aria-current','step');
      else marker.removeAttribute('aria-current');
    });
    form.setAttribute('data-quote-current',String(current));
    clearInvalid();
    updateReview();
    if(focusHeading){
      const heading=steps[current].querySelector('h3');
      if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
      steps[current].scrollIntoView({block:'nearest',behavior:'auto'});
    }
  }
  function validateStep(index){
    const required=Array.from(steps[index].querySelectorAll('[required]'));
    const invalid=findInvalid(required);
    if(!invalid)return true;
    invalid.setAttribute('aria-invalid','true');
    feedback.textContent=text('Please complete the required fields before continuing.','Completa los campos obligatorios antes de continuar.');
    invalid.focus({preventScroll:false});
    return false;
  }
  form.querySelectorAll('[data-quote-next]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(validateStep(current))show(current+1,true);
    });
  });
  form.querySelectorAll('[data-quote-back]').forEach(button=>{
    button.addEventListener('click',()=>show(current-1,true));
  });
  form.addEventListener('input',event=>{
    if(event.target instanceof HTMLElement&&event.target.hasAttribute('aria-invalid'))event.target.removeAttribute('aria-invalid');
    if(feedback.textContent)feedback.textContent='';
    updateReview();
  });
  form.addEventListener('change',updateReview);
  /* Capture runs before main form handler. Never focus a hidden, invalid field. */
  form.addEventListener('submit',event=>{
    const fields=Array.from(form.querySelectorAll('[required]'));
    const invalid=findInvalid(fields);
    if(invalid){
      event.preventDefault();
      event.stopImmediatePropagation();
      const fieldset=invalid.closest('[data-quote-step]');
      if(fieldset){
        const target=steps.indexOf(fieldset);
        if(target!==current)show(target,true);
      }
      invalid.setAttribute('aria-invalid','true');
      feedback.textContent=text('Please complete all required fields, including a valid email address.','Completa todos los campos obligatorios, incluido un correo válido.');
      invalid.focus({preventScroll:false});
      return;
    }
    if(current<2){
      event.preventDefault();
      event.stopImmediatePropagation();
      show(2,true);
    }
  },true);
  document.addEventListener('portfolio:languagechange',()=>{
    updateReview();
    if(feedback.textContent)feedback.textContent='';
  });
  /* Progressive enhancement: show all form sections when JavaScript is absent. */
  show(0);
  form.classList.add('quote-enhanced');
})();
