import { expect, test } from "@playwright/test";
import exp from "constants";

const STANDARD_USER = "standard_user";
const LOCKED_OUT_USER = "locked_out_user";
const PASSWORD = "secret_sauce";
const ERROR_MESSAGE =
  "Epic sadface: Username and password do not match any user in this service";
const ERROR_MESSAGE_LOCKED =
  "Epic sadface: Sorry, this user has been locked out.";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
});
// https://the-internet.herokuapp.com/
// https://www.saucedemo.com/v1/

// 1- Login com sucesso
// Usar usuário standard_user
// - Verificar URL Pagina
// - Verificar pelo menos 1 item da pagina final (visible)
test("Desafio 1", async ({ page }) => {
  await page.getByTestId("username").fill(STANDARD_USER);
  await page.getByTestId("password").fill(PASSWORD);
  await page.getByTestId("login-button").click();

  // este comando ao utilizar a flag --debug irá pausar nesta linha
  // a execução do código
  //await page.pause();

  const inventoryItem = await page
    .getByTestId("inventory-item")
    .filter({ hasText: "Sauce Labs Bike Light" });

  await expect(inventoryItem).toBeVisible();
});

// 2- Login com usuario locked
// Usar usuário locked_out_user
// - Verificar Mensagem de erro
test("Desafio 2", async ({ page }) => {
  await page.getByTestId("username").fill(LOCKED_OUT_USER);
  await page.getByTestId("password").fill(PASSWORD);
  await page.getByTestId("login-button").click();

  const errorHeader = await page.getByTestId("error");
  await expect(errorHeader).toBeVisible();
  await expect(errorHeader).toHaveText(ERROR_MESSAGE_LOCKED);
});

// 3- Login senha errada
// - Verificar Mensagem de erro
test("Desafio 3", async ({ page }) => {
  await page.getByTestId("username").fill(STANDARD_USER);
  await page.getByTestId("password").fill("1234");
  await page.getByTestId("login-button").click();

  const errorHeader = await page.getByTestId("error");
  await expect(errorHeader).toBeVisible();
  await expect(errorHeader).toHaveText(ERROR_MESSAGE);
});
