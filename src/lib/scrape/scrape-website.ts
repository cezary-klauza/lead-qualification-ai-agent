import puppeteer from "puppeteer";

export const scrapeWebsite = async (url: string) => {
  // for serverless you need additional browser configuration
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const res = await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const content = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();

  return content;
};
