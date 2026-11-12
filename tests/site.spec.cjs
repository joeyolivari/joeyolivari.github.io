const {test,expect}=require('@playwright/test');
const routes=[
  ['/', 'Home'],['/services.html','Services'],['/career-tools.html','Career tools'],['/privacy.html',null],
  ['/ai-command-center.html','Work'],['/sql-quest.html','Work'],
  ['/excel-cleanup-case-study.html','Samples'],['/budget-tracker-case-study.html','Samples'],
  ['/thanks.html',null],['/404.html',null]
];
const targetLang=(path,lang)=>{
  if(lang==='en')return path;
  return path==='/'?'/es/':'/es'+path;
};
for(const width of [320,390,768,1280,1440]){
  for(const [path,active] of routes){
    test('layout and single-line nav '+path+' at '+width+'px',async({page})=>{
      await page.setViewportSize({width,height:860});
      const response=await page.goto(path,{waitUntil:'domcontentloaded'});
      expect(response.status()).toBe(200);
      await expect(page.locator('header > .language-picker')).toHaveCount(1);
      const selected=page.locator('header > nav > a.nav-active');
      await expect(selected).toHaveCount(active?1:0);
      if(active){
        await expect(selected).toHaveText(active);
        const style=await selected.evaluate(a=>({content:getComputedStyle(a,'::after').content,height:getComputedStyle(a,'::after').height,color:getComputedStyle(a,'::after').backgroundColor,decoration:getComputedStyle(a).textDecorationLine}));
        expect(style.content).not.toBe('none');
        expect(style.height).toBe('2px');
        expect(style.color).toBe('rgb(127, 162, 106)');
        expect(style.decoration).toBe('none');
      }
      const plain=await page.locator('header > nav > a:not(.nav-active):not(:last-child)').first().evaluate(a=>({content:getComputedStyle(a,'::after').content,decoration:getComputedStyle(a).textDecorationLine,background:getComputedStyle(a).backgroundImage}));
      expect(plain.content).toBe('none');expect(plain.decoration).toBe('none');expect(plain.background).toBe('none');
      const overflow=await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }
}
for(const width of [320,390,768,1280]){
  for(const [path,active] of routes.filter(([path])=>!path.endsWith('404.html')&&!path.endsWith('thanks.html'))){
    test('fully translated Spanish layout '+path+' at '+width+'px',async({page})=>{
      await page.setViewportSize({width,height:860});
      const response=await page.goto(targetLang(path,'es'),{waitUntil:'domcontentloaded'});
      expect(response.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang','es');
      await expect(page.locator('header > nav > a').nth(1)).toHaveText('Servicios');
      await expect(page.locator('header > .language-picker')).toHaveCount(1);
      const activeNav=page.locator('header > nav > a.nav-active');
      await expect(activeNav).toHaveCount(active?1:0);
      const overflow=await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }
}
for(const [path] of routes){
  test('bilingual switching changes the canonical path '+path,async({page})=>{
    await page.goto(path,{waitUntil:'domcontentloaded'});
    await page.locator('[data-lang-option="es"]').click();
    await expect(page).toHaveURL(new RegExp(targetLang(path,'es').replaceAll('/','\\/')+'(?:[?#]|$)'));
    await expect(page.locator('html')).toHaveAttribute('lang','es');
    await expect(page.locator('header > nav > a').nth(1)).toHaveText('Servicios');
    await page.locator('[data-lang-option="en"]').click();
    await expect(page).toHaveURL(new RegExp(path.replaceAll('/','\\/')+'(?:[?#]|$)'));
    await expect(page.locator('html')).toHaveAttribute('lang','en');
    await expect(page.locator('header > nav > a').nth(1)).toHaveText('Services');
  });
}
test('quote flow keeps data when changing EN/ES',async({page})=>{
  await page.goto('/services.html?service=resume#contact',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#f-service')).toHaveValue('Resume rewrite');
  await page.locator('[data-quote-next]').first().click();
  await expect(page.locator('[data-quote-step="1"]')).toBeVisible();
  await page.locator('#f-goal').fill('Finance analyst project example');
  await page.locator('[data-quote-next]').last().click();
  await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
  await page.locator('#f-name').fill('Example Person');
  await page.locator('#f-email').fill('invalid');
  await page.locator('[data-quote-step="2"] button[type="submit"]').click();
  await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid','true');
  await page.locator('[data-lang-option="es"]').click();
  await expect(page).toHaveURL(/\/es\/services\.html\?service=resume/);
  await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
  await expect(page.locator('#f-email')).toHaveValue('invalid');
  await expect(page.locator('#f-service')).toHaveValue('Resume rewrite');
  await page.locator('[data-quote-step="2"] button[type="submit"]').click();
  await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid','true');
  await page.locator('[data-lang-option="en"]').click();
  await expect(page.locator('#f-goal')).toHaveValue('Finance analyst project example');
  await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
});
for(const path of ['/ai-command-center.html','/sql-quest.html','/es/ai-command-center.html','/es/sql-quest.html']){
  test('case walkthrough has keyboard tabs '+path,async({page})=>{
    await page.goto(path,{waitUntil:'domcontentloaded'});
    const tabs=page.locator('[data-case-lab] [role="tab"]');
    await expect(tabs).toHaveCount(3);
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');
    await expect(page.locator('[data-case-panel]').nth(1)).toBeVisible();
    await page.keyboard.press('End');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected','true');
  });
}
for(const name of ['excel-cleanup-case-study.html','budget-tracker-case-study.html']){
  for(const lang of ['en','es']){
    test('case study has working sample and quote path '+lang+' '+name,async({page,request})=>{
      const path=targetLang('/'+name,lang);
      await page.goto(path,{waitUntil:'domcontentloaded'});
      await expect(page.locator('main h1')).toHaveCount(1);
      const link=page.locator('.case-actions a[download]').first();
      await expect(link).toBeVisible();
      const url=await link.getAttribute('href');
      const response=await request.get(new URL(url,page.url()).toString());
      expect(response.status()).toBe(200);
      await expect(page.locator('.outcome-stat')).toHaveCount(3);
      const localeQuote=page.locator('.case-actions a[href*="service="]');
      await expect(localeQuote).toHaveCount(1);
    });
  }
}
test('branded FormSubmit redirect and 404 remain functional',async({page,request})=>{
  await page.goto('/services.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('input[name="_next"]')).toHaveValue('https://joeyolivari.github.io/thanks.html');
  await page.goto('/es/services.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('input[name="_next"]')).toHaveValue('https://joeyolivari.github.io/es/thanks.html');
  await page.goto('/404.html',{waitUntil:'domcontentloaded'});
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.locator('link[href="/styles-v13.css"]').count()).toBe(1);
  const css=await request.get('/styles-v13.css');
  expect(css.status()).toBe(200);
});
test('language alternates are reciprocal and sitemap has 14 public URLs',async({page,request})=>{
  for(const name of ['','services.html','career-tools.html','ai-command-center.html','sql-quest.html','excel-cleanup-case-study.html','budget-tracker-case-study.html']){
    for(const lang of ['en','es']){
      await page.goto('/'+(lang==='es'?'es/':'')+name,{waitUntil:'domcontentloaded'});
      await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
      await expect(page.locator('link[hreflang="es"]')).toHaveCount(1);
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain(lang==='es'?'https://joeyolivari.github.io/es/':'https://joeyolivari.github.io/');
    }
  }
  const xml=await (await request.get('/sitemap.xml')).text();
  expect((xml.match(/<loc>/g)||[]).length).toBe(14);
});
test('Spanish content is present without JavaScript',async({browser})=>{
  const ctx=await browser.newContext({javaScriptEnabled:false});
  try{
    const page=await ctx.newPage();
    await page.goto('/es/services.html');
    await expect(page.locator('html')).toHaveAttribute('lang','es');
    await expect(page.locator('main h1')).not.toContainText('Two services');
    await expect(page.locator('header > nav > a').nth(1)).toHaveText('Servicios');
  }finally{await ctx.close();}
});
test('unpublished testimonials are not invented',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#client-feedback')).toBeHidden();
  await expect(page.locator('#client-feedback .client-testimonial')).toHaveCount(0);
});


const noEmDashPages=['/','/services.html','/career-tools.html','/privacy.html','/ai-command-center.html','/sql-quest.html','/excel-cleanup-case-study.html','/budget-tracker-case-study.html','/thanks.html','/404.html'];
const forbiddenEmDash=String.fromCharCode(8212);
for(const path of noEmDashPages){
  for(const prefix of ['','/es']){
    test('visible copy punctuation '+(prefix||'en')+path,async({page})=>{
      await page.goto(prefix+path,{waitUntil:'domcontentloaded'});
      expect(await page.locator('body').innerText()).not.toContain(forbiddenEmDash);
      expect(await page.title()).not.toContain(forbiddenEmDash);
      await expect(page.locator('header > .language-picker')).toHaveCount(1);
    });
  }
}
test('not-applicable comparison cells in both languages',async({page})=>{
  await page.goto('/services.html#samples',{waitUntil:'domcontentloaded'});
  await expect(page.locator('td[aria-label="Not applicable"]')).toHaveCount(2);
  await expect(page.locator('td[aria-label="Not applicable"]').first()).toHaveText('N/A');
  await page.goto('/es/services.html#samples',{waitUntil:'domcontentloaded'});
  await expect(page.locator('td[aria-label="No aplica"]')).toHaveCount(2);
});
