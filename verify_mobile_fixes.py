
import asyncio, sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        page = await context.new_page()

        print('Testing Home Page on 375px mobile viewport...')
        await page.goto('http://localhost:3000', wait_until='domcontentloaded', timeout=10000)
        await page.screenshot(path='hero_mobile.png')
        print('Saved hero_mobile.png')

        # Scroll down to ScrollSplitCard section
        await page.evaluate('window.scrollTo(0, 1500)')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='products_mobile.png')
        print('Saved products_mobile.png')

        # Test About Us page
        print('Testing About Us 3D Car page on 375px mobile viewport...')
        await page.goto('http://localhost:3000/about-us', wait_until='domcontentloaded', timeout=10000)
        await page.evaluate('window.scrollTo(0, 1000)')
        await page.wait_for_timeout(1500)
        await page.screenshot(path='about_mobile.png')
        print('Saved about_mobile.png')

        await browser.close()
        print('Verification complete.')

asyncio.run(run())
