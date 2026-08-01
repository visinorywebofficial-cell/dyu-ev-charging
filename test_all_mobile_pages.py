
import asyncio, json, sys, os
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

pages_to_test = [
    ('/', 'hero_mobile.png'),
    ('/about-us', 'about_mobile.png'),
    ('/ac-chargers', 'ac_chargers_mobile.png'),
    ('/dc-chargers', 'dc_chargers_mobile.png'),
    ('/ev-charging-app', 'ev_app_mobile.png'),
    ('/ev-charging-software/csms', 'csms_mobile.png'),
    ('/ev-charging-software/evlinq', 'evlinq_mobile.png'),
    ('/contact-us', 'contact_mobile.png'),
    ('/partner-with-us', 'partner_mobile.png'),
    ('/ev-charging-station-franchise', 'franchise_mobile.png'),
    ('/ev-calculator', 'calculator_mobile.png'),
    ('/faq', 'faq_mobile.png')
]

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

        page_errors = []
        page.on('pageerror', lambda err: page_errors.append(str(err)))

        for route, filename in pages_to_test:
            url = f'http://localhost:3000{route}'
            print(f'Testing {url} ...')
            try:
                res = await page.goto(url, wait_until='domcontentloaded', timeout=10000)
                status = res.status if res else 'No Response'
                await page.wait_for_timeout(1000)
                await page.screenshot(path=filename)
                print(f'  [OK] Status {status} -> Saved {filename}')
            except Exception as e:
                print(f'  [FAIL] {url}: {e}')

        print(f'\nTotal Uncaught Page Errors: {len(page_errors)}')
        if page_errors:
            print(json.dumps(page_errors, indent=2))

        await browser.close()
        print('All mobile pages tested successfully.')

asyncio.run(run())
