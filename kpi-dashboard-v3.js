'use strict';
(function(){
  const board=document.querySelector('[data-report-demo]');
  if(!board)return;
  const options=[...board.querySelectorAll('[data-report-option]')];
  const months=[...board.querySelectorAll('[data-kpi-month]')];
  const monthBars=[...board.querySelectorAll('.report-month')];
  const budgetBars=[...board.querySelectorAll('[data-budget-bar]')];
  const actualBars=[...board.querySelectorAll('[data-actual-bar]')];
  const amount=board.querySelector('[data-report-actual]');
  const variance=board.querySelector('[data-report-variance]');
  const percent=board.querySelector('[data-kpi-percent]');
  const status=board.querySelector('[data-report-status]');
  const monthly=board.querySelector('[data-kpi-monthly]');
  const utilization=board.querySelector('[data-kpi-utilization]');
  const meter=board.querySelector('.kpi-meter-fill');
  const scenarioGroup=board.querySelector('.report-options');
  const monthsGroup=board.querySelector('.kpi-months');
  if(!amount||!variance||!percent||!status||!monthly||!meter||months.length!==3)return;
  const data={
    under:{budget:[3000,3200,3800],actual:[2700,2900,3100]},
    over:{budget:[3000,3200,3800],actual:[3300,3700,4500]}
  };
  const total=arr=>arr.reduce((a,b)=>a+b,0);
  const names={en:['Jan','Feb','Mar'],es:['Ene','Feb','Mar']};
  const language=()=>document.documentElement.lang==='es'?'es':'en';
  const money=value=>'CA$'+new Intl.NumberFormat(language()==='es'?'es-ES':'en-CA',{maximumFractionDigits:0}).format(Math.abs(Math.round(value)));
  const signedMoney=value=>value<0?'−'+money(value):value>0?'+'+money(value):money(0);
  const signedPct=value=>(value<0?'−':value>0?'+':'')+Math.abs(Math.round(value))+'%';
  const prefersReduced=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scenario='under',selectedMonth=2,displayedActual=8700,displayedVariance=-1300,displayedPercent=-13,frame=null,version=0;

  function drawMetrics(a,v,p,final=false){
    amount.textContent=money(a);
    variance.textContent=signedMoney(v);
    percent.textContent=signedPct(p);
    displayedActual=a;displayedVariance=v;displayedPercent=p;
  }
  function animateMetrics(a,v,p,animate){
    if(frame!==null){cancelAnimationFrame(frame);frame=null;}
    const myVersion=++version;
    if(!animate||prefersReduced()||!window.requestAnimationFrame){
      drawMetrics(a,v,p,true);
      return;
    }
    const fromA=displayedActual,fromV=displayedVariance,fromP=displayedPercent;
    const started=performance.now();
    const tick=time=>{
      if(myVersion!==version)return;
      const progress=Math.min(1,(time-started)/520);
      const ease=1-Math.pow(1-progress,3);
      drawMetrics(fromA+(a-fromA)*ease,fromV+(v-fromV)*ease,fromP+(p-fromP)*ease);
      if(progress<1)frame=requestAnimationFrame(tick);
      else{frame=null;drawMetrics(a,v,p,true);}
    };
    frame=requestAnimationFrame(tick);
  }
  function render(animate=false){
    const d=data[scenario],budget=total(d.budget),spent=total(d.actual),diff=spent-budget;
    const ratio=spent/budget*100;
    board.dataset.scenario=scenario;
    board.style.setProperty('--utilization',Math.min(100,ratio)+'%');
    animateMetrics(spent,diff,diff/budget*100,animate);
    if(utilization)utilization.textContent=Math.round(ratio)+'%';
    meter.setAttribute('role','progressbar');
    meter.setAttribute('aria-label',language()==='es'?'Uso del presupuesto':'Budget utilization');
    meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');
    meter.setAttribute('aria-valuenow',String(Math.min(100,Math.round(ratio))));
    meter.setAttribute('aria-valuetext',Math.round(ratio)+'%');
    status.textContent=language()==='es'
      ? (diff>0?money(diff)+' por encima del presupuesto':money(-diff)+' por debajo del presupuesto')
      : (money(Math.abs(diff))+(diff>0?' over budget':' under budget'));
    scenarioGroup?.setAttribute('aria-label',language()==='es'?'Escenario de gastos':'Spending scenario');
    monthsGroup?.setAttribute('aria-label',language()==='es'?'Seleccionar mes':'Select month');
    options.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.reportOption===scenario)));
    const labels=names[language()];
    months.forEach((btn,i)=>{
      btn.setAttribute('aria-pressed',String(i===selectedMonth));
      btn.setAttribute('aria-label',(language()==='es'?'Ver detalles de ':'View details for ')+labels[i]);
    });
    monthBars.forEach((bucket,i)=>bucket.dataset.monthActive=String(i===selectedMonth));
    budgetBars.forEach((bar,i)=>bar.style.setProperty('--bar-height',Math.round(d.budget[i]/4500*100)+'%'));
    actualBars.forEach((bar,i)=>bar.style.setProperty('--bar-height',Math.round(d.actual[i]/4500*100)+'%'));
    const i=selectedMonth;
    monthly.textContent=language()==='es'
      ? labels[i]+': gasto '+money(d.actual[i])+' / presupuesto '+money(d.budget[i])
      : labels[i]+': '+money(d.actual[i])+' spent / '+money(d.budget[i])+' budget';
  }
  options.forEach(btn=>btn.addEventListener('click',()=>{
    const next=btn.dataset.reportOption;
    if(next!=='under'&&next!=='over'||next===scenario)return;
    scenario=next;
    render(true);
  }));
  months.forEach((btn,i)=>btn.addEventListener('click',()=>{selectedMonth=i;render(false);}));
  document.addEventListener('portfolio:languagechange',()=>render(false));
  render(false);
})();
