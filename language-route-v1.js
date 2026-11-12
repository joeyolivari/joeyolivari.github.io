'use strict';
(function(){
  const path=location.pathname;
  const spanish=path==='/es'||path.startsWith('/es/');
  const currentLang=spanish?'es':'en';
  const filename=path.split('/').filter(Boolean).pop()||'index.html';
  const supported=new Set(['index.html','services.html','career-tools.html','privacy.html','ai-command-center.html','sql-quest.html','excel-cleanup-case-study.html','budget-tracker-case-study.html','thanks.html','404.html']);
  const page=supported.has(filename)?filename:'index.html';
  const home=page==='index.html';
  const destination=lang=>(lang==='es'?'/es/':'/')+(home?'':page);
  const query=()=>{const u=new URLSearchParams(location.search);u.delete('lang');const qs=u.toString();return qs?'?'+qs:'';};
  const requested=new URLSearchParams(location.search).get('lang');
  if((requested==='en'||requested==='es')&&requested!==currentLang){
    location.replace(destination(requested)+query()+location.hash);
    return;
  }
  document.documentElement.lang=currentLang;
  const nav=document.querySelector('header > nav');
  if(nav)nav.setAttribute('aria-label',spanish?'Navegación principal':'Main navigation');
  const key='portfolio-language';
  try{localStorage.setItem(key,currentLang);}catch(_){}
  const form=document.getElementById('inquiry');
  function storeDraft(target){
    if(!form)return;
    const data={};
    for(const field of form.querySelectorAll('input,select,textarea')){
      if(!field.name||field.name.startsWith('_')||field.type==='hidden')continue;
      data[field.name]=field.type==='checkbox'?field.checked:field.value;
    }
    const step=Number(form.dataset.quoteCurrent)||0;
    try{sessionStorage.setItem('portfolio-locale-handoff',JSON.stringify({target,at:Date.now(),step,data}));}catch(_){}
  }
  function restoreDraft(){
    if(!form)return;
    try{
      const raw=sessionStorage.getItem('portfolio-locale-handoff');
      if(!raw)return;
      sessionStorage.removeItem('portfolio-locale-handoff');
      const saved=JSON.parse(raw);
      if(saved.target!==location.pathname||Date.now()-saved.at>120000||!saved.data)return;
      for(const field of form.querySelectorAll('input,select,textarea')){
        if(!field.name||!Object.prototype.hasOwnProperty.call(saved.data,field.name))continue;
        if(field.type==='checkbox')field.checked=!!saved.data[field.name];
        else field.value=saved.data[field.name];
      }
      form.dataset.restoredQuoteStep=String(Math.max(0,Math.min(2,saved.step||0)));
    }catch(_){}
  }
  restoreDraft();
  document.querySelectorAll('[data-lang-option]').forEach(button=>{
    const lang=button.dataset.langOption;
    button.setAttribute('aria-pressed',String(lang===currentLang));
    button.addEventListener('click',()=>{
      if(lang===currentLang)return;
      const target=destination(lang);
      storeDraft(target);
      try{localStorage.setItem(key,lang);}catch(_){}
      location.assign(target+query()+location.hash);
    });
  });
})();