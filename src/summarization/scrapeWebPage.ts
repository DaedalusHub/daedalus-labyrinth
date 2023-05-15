import puppeteer from 'puppeteer';

export default async function scrapeWebPage(url: string): Promise<string> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const allText = await page.evaluate(() => {
      const bodyText = document.querySelector('body')?.innerText || '';
      return bodyText.replace(/\s\s+/g, ' ').trim();
    });

    await browser.close();
    return allText;
  } catch (error) {
    console.error(`Error while scraping the web page: ${error}`);
    return '';
  }
}
