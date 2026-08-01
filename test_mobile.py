
import asyncio, json, sys

sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

async def test_url(url, p):
    print(f'=== TESTING {url} ===')
    browser = await p.chromium.launch(headless=True)
    iphone = p.devices['iPhone 13']
    context = await browser.new_context(**iphone)
    page = await context.new_page()

    console_logs = []
    page_errors = []
    request_failures = []

    page.on('console', lambda msg: console_logs.append({'type': msg.type, 'text': msg.text}))
    page.on('pageerror', lambda err: page_errors.append(str(err)))
    page.on('requestfailed', lambda req: request_failures.append({'url': req.url, 'failure': str(req.failure)}))

    try:
        response = await page.goto(url, wait_until='domcontentloaded', timeout=10000)
        status = response.status if response else 'No Response'
        print(f'HTTP Status: {status}')
        await page.wait_for_timeout(2000)

        print(f'Page Errors Count: {len(page_errors)}')
        if page_errors:
            print('Page Errors:', json.dumps(page_errors, indent=2))

        errors_only = [l for l in console_logs if l['type'] in ['error', 'warning']]
        print(f'Console Errors/Warnings Count: {len(errors_only)}')
        if errors_only:
            print('Console Errors/Warnings:', json.dumps(errors_only, indent=2))

        print(f'Failed Requests Count: {len(request_failures)}')
        if request_failures:
            print('Failed Requests:', json.dumps(request_failures, indent=2))

        body_text = await page.evaluate('document.body.innerText')
        print(f'Body Text Length: {len(body_text.strip())}')
        print('Body Text First 200 chars:', repr(body_text[:200]))
    except Exception as e:
        print(f'Navigation Error: {e}')

    await browser.close()
    print('\n')

async def main():
    async with async_playwright() as p:
        await test_url('http://localhost:3000', p)
        await test_url('http://192.168.1.3:3000', p)

asyncio.run(main())
