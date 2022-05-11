import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { config } from "../support/config";
import { ICustomWorld } from "../support/custom-world";

const buildButtonLocator = "//span[contains(text(),'Build')]";
const menuButtonLocator = "text=Menu";
const helpButtonLocator = "text=Help";
const canvasLocator = "//canvas[@id='backgroundgl']";
const connectWalletLocator = "text='Connect wallet'"
// TODO the worst locator ever, need to fix asap
const briqsCounterLocator = "//div[@position='relative w-full']/p[1]"
const expectedHelpCenterUrl = "https://briqnft.notion.site/Help-center-4a4958337970483dbfc2c1184290b42f"
let helpPageActualUrl: string;

Given('User opens briq welcome page', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_BRIQ_URL);
  await page.locator(buildButtonLocator).waitFor();
});

When('`Build` button is clicked', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.click(buildButtonLocator);
  await page.locator(menuButtonLocator).waitFor();
});

Then('User is presented with canvas', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator(connectWalletLocator).isVisible();
});

Given('User opens briq builder page', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_BRIQ_URL+'/builder');
  await page.locator(menuButtonLocator).waitFor();
});

When('`Help` button is clicked', async function (this: ICustomWorld) {
  const [newPage] = await Promise.all([
    this.context!.waitForEvent('page'),
    this.page!.click(helpButtonLocator), // Opens a new tab
  ])
  await newPage.waitForLoadState();
  helpPageActualUrl = newPage.url()
});

Then('User is redirected to the `How to` guide', async function (this: ICustomWorld) {
  // Get page after a specific action (e.g. clicking a link)
  expect(helpPageActualUrl).toBe(expectedHelpCenterUrl)
});

When('User left clicks on x={int} and y={int} coordinates in the canvas', async function (this: ICustomWorld, _x: number, _y: number) {
  const page = this.page!;
  await page.click(canvasLocator, {position: {x: _x, y: _y}});
});

When('User right clicks on x={int} and y={int} coordinates in the canvas', async function (this: ICustomWorld, _x: number, _y: number) {
  const page = this.page!;
  await page.click(canvasLocator, { position: { x: _x, y: _y }, button: "right"});
});

Then('Amount of used briqs is {int}', async function (this: ICustomWorld, numberOfBriqs: number) {
  const page = this.page!;
  await expect(page.locator(briqsCounterLocator)).toHaveText(`${numberOfBriqs} briqs Loading chain briqs...`)
});

