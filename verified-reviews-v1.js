'use strict';
(async function(){
  const slot=document.getElementById('client-feedback');
  if(!slot)return;
  try{
    const response=await fetch(slot.dataset.reviewsSrc,{cache:'no-store'});
    if(!response.ok)return;
    const data=await response.json();
    if(!Array.isArray(data))return;
    const safe=data.filter(item=>item&&item.permission===true&&typeof item.name==='string'&&item.name.trim()&&item.quote&&typeof item.quote.en==='string'&&typeof item.quote.es==='string'&&item.quote.en.trim()&&item.quote.es.trim());
    if(!safe.length)return;
    const render=()=>{
      const spanish=document.documentElement.lang==='es';
      slot.replaceChildren();
      for(const item of safe){
        const article=document.createElement('article');
        article.className='client-testimonial';
        const quote=document.createElement('p');
        quote.textContent=item.quote[spanish?'es':'en'];
        const citation=document.createElement('cite');
        citation.textContent=item.name+(item.role?' · '+item.role:'');
        article.append(quote,citation);
        slot.append(article);
      }
      slot.hidden=false;
    };
    render();
    document.addEventListener('portfolio:languagechange',render);
  }catch(_){/* Site remains fully functional if review data is unavailable. */}
})();