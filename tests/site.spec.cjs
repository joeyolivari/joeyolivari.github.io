const {test,expect}=require('@playwright/test');
const routes=[['/','Home'],['/services.html','Services'],['/career-tools.html','Career tools'],['/privacy.html',null],['/ai-command-center.html','Work'],['/sql-quest.html','Work']];
for(const width of [320,390,768,1280,1440]){
  for(const [path,active] of routes){
    test('layout and navigation '+path+' at '+width+'px',async({page})=>{
      await page.setViewportSize({width,height:860});
      await page.goto(path,{waitUntil:'domcontentloaded'});
      await expect(page.locator('header > .language-picker')).toHaveCount(1);
      const activeNav=page.locator('header > nav > a.nav-active');
      await expect(activeNav).toHaveCount(active?1:0);
      if(active){
        await expect(activeNav).toHaveText(active);
        const indicator=await activeNav.evaluate(a=>({content:getComputedStyle(a,'::after').content,height:getComputedStyle(a,'::after').height,color:getComputedStyle(a,'::after').backgroundColor,decoration:getComputedStyle(a).textDecorationLine}));
        expect(indicator.content).not.toBe('none');
        expect(indicator.height).toBe('2px');
        expect(indicator.color).toBe('rgb(127, 162, 106)');
        expect(indicator.decoration).toBe('none');
      }
      const plain=await page.locator('header > nav > a:not(.nav-active):not(:last-child)').first().evaluate(a=>({content:getComputedStyle(a,'::after').content,decoration:getComputedStyle(a).textDecorationLine,background:getComputedStyle(a).backgroundImage}));
      expect(plain.content).toBe('none');
      expect(plain.decoration).toBe('none');
      expect(plain.background).toBe('none');
      const overflow=await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }
}
for(const [path] of routes){
  test('English/Spanish toggling without reload '+path,async({page})=>{
    await page.goto(path,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>window.__pageMarker='preserved');
    await page.locator('[data-lang-option="es"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang','es');
    await expect(page.locator('header > nav > a').nth(1)).toHaveText('Servicios');
    expect(await page.evaluate(()=>window.__pageMarker)).toBe('preserved');
    await page.locator('[data-lang-option="en"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang','en');
    await expect(page.locator('header > nav > a').nth(1)).toHaveText('Services');
    expect(await page.evaluate(()=>window.__pageMarker)).toBe('preserved');
  });
}
test('quote wizard validates and can switch language mid-flow',async({page})=>{
  await page.goto('/services.html?service=resume#contact',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#f-service')).toHaveValue('Resume rewrite');
  await page.locator('[data-quote-next]').first().click();
  await expect(page.locator('[data-quote-step="1"]')).toBeVisible();
  await page.locator('#f-goal').fill('Finance and analyst applications');
  await page.locator('[data-quote-next]').last().click();
  await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
  await page.locator('#f-name').fill('Test User');
  await page.locator('#f-email').fill('invalid');
  await page.locator('[data-quote-step="2"] button[type="submit"]').click();
  await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid','true');
  await page.locator('[data-lang-option="es"]').click();
  await expect(page.locator('#f-email')).toHaveAttribute('aria-invalid','true');
  await expect(page.locator('header > nav > a').nth(1)).toHaveText('Servicios');
});
for(const path of ['/ai-command-center.html','/sql-quest.html']){
  test('case walkthrough keyboard tabs '+path,async({page})=>{
    await page.goto(path,{waitUntil:'domcontentloaded'});
    const tabs=page.locator('[data-case-lab] [role="tab"]');
    await expect(tabs).toHaveCount(3);
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');
    await expect(page.locator('[data-case-panel]').nth(1)).toBeVisible();
    await page.keyboard.press('End');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected','true');
    await page.emulateMedia({reducedMotion:'reduce'});
    await expect(page.locator('[data-case-panel]').nth(2)).toBeVisible();
  });
}
