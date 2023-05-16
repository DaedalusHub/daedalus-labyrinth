import puppeteer from 'puppeteer';

export default async function scrapeWebPage(url: string): Promise<string> {
  console.log(`Starting to scrape the web page: ${url}`);
  try {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto(url);

    const allText = await page.evaluate(() => {
      const body = document.querySelector('body');
      return body ? body.innerText : '';
    });

    await browser.close();

    if (allText === '') {
      console.error(`Scraped text is empty: ${url}`);
    }

    const formattedText = allText.replace(/\n\n/g, ' - ').replace(/\n/g, ' ');

    console.log(`Scraped web page successfully: ${url}`);
    console.debug(`Scraped text length: ${formattedText.length}`);
    return formattedText;
  } catch (error) {
    console.error(`Error while scraping the web page: ${error}`);
    return '';
  }
}
