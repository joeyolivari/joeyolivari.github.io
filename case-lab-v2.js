'use strict';
(function(){
  document.querySelectorAll('[data-case-lab]').forEach(lab=>{
    const list=lab.querySelector('[data-case-tabs]');
    const tabs=Array.from(lab.querySelectorAll('[data-case-tab]'));
    const panels=Array.from(lab.querySelectorAll('[data-case-panel]'));
    if(!list||tabs.length<2||tabs.length!==panels.length)return;
    function activate(index,moveFocus){
      panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.setAttribute('tabindex',i===index?'0':'-1');});
      tabs.forEach((tab,i)=>{
        tab.setAttribute('aria-selected',String(i===index));
        tab.setAttribute('tabindex',i===index?'0':'-1');
      });
      if(moveFocus)tabs[index].focus({preventScroll:true});
    }
    list.setAttribute('role','tablist');
    tabs.forEach((tab,i)=>{
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-controls',panels[i].id);
      tab.id=tab.id||'case-tab-'+i;
      panels[i].setAttribute('role','tabpanel');
      panels[i].setAttribute('aria-labelledby',tab.id);
      tab.addEventListener('click',event=>{event.preventDefault();activate(i,false);});
      tab.addEventListener('keydown',event=>{
        const commands=['ArrowLeft','ArrowRight','Home','End'];
        if(!commands.includes(event.key))return;
        event.preventDefault();
        const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:
          (i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        activate(next,true);
      });
    });
    function translateAria(){
      const spanish=document.documentElement.lang==='es';
      const isSql=!!lab.querySelector('#sql-lab-question');
      lab.setAttribute('aria-label',spanish?(isSql?'Explorar una investigación SQL de ejemplo':'Explorar el proceso de análisis'):(isSql?'Explore a sample SQL investigation':'Explore the analysis process'));
      list.setAttribute('aria-label',spanish?(isSql?'Etapas de investigación':'Etapas de análisis'):(isSql?'Investigation stages':'Analysis stages'));
    }
    translateAria();
    document.addEventListener('portfolio:languagechange',translateAria);
    lab.classList.add('case-lab-enhanced');
    activate(0,false);
  });
})();
