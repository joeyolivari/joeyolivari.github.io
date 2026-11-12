'use strict';
(function(){
  const demo=document.querySelector('[data-report-demo]');
  if(!demo)return;
  const options=[...demo.querySelectorAll('[data-report-option]')];
  const bars=[...demo.querySelectorAll('[data-actual-bar]')];
  const actual=demo.querySelector('[data-report-actual]');
  const variance=demo.querySelector('[data-report-variance]');
  const status=demo.querySelector('[data-report-status]');
  const group=demo.querySelector('.report-options');
  const scenarios={
    under:{actual:'CA$8,700',variance:'−CA$1,300',bars:[44,58,72],status:{en:'CA$1,300 under budget',es:'1.300 CAD por debajo del presupuesto'}},
    over:{actual:'CA$11,500',variance:'+CA$1,500',bars:[70,68,92],status:{en:'CA$1,500 over budget',es:'1.500 CAD por encima del presupuesto'}}
  };
  let selected='under';
  function render(){
    const state=scenarios[selected];
    const spanish=document.documentElement.lang==='es';
    demo.dataset.scenario=selected;
    actual.textContent=state.actual;
    variance.textContent=state.variance;
    status.textContent=state.status[spanish?'es':'en'];
    group.setAttribute('aria-label',spanish?'Escenario de gasto':'Spending scenario');
    options.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.reportOption===selected)));
    bars.forEach((bar,index)=>bar.style.setProperty('--bar-height',state.bars[index]+'%'));
  }
  options.forEach(button=>button.addEventListener('click',()=>{
    const next=button.dataset.reportOption;
    if(next!=='under'&&next!=='over')return;
    selected=next;
    render();
  }));
  document.addEventListener('portfolio:languagechange',render);
  render();
})();