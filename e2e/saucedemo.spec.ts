import test, { expect } from "@playwright/test";
import exp from "constants";

test("Acessar o saucedemo buscando por testid", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  await page.getByTestId("username").fill("usuario-demo");
});

test.only("Asserts básicos", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  // const logginButton = await page.locator('input[id="login-button"]');
  // Capturamos o elemento completo com um alias, porém em uma váriavel
  const logginButton = await page.locator("#login-button");
  // await é opcional, porém dependendo do matcher, uma função assíncrona pode
  // ser executada
  // O soft assert não para a execução do teste na primeira falha, ele vai percorrer
  // todas as asserções abaixo
  await expect
    .soft(logginButton, "Falha intencional com soft")
    .toHaveAttribute("type", "slubmit");
  // O matcher not inverte a lógica de todos os comandos
  await expect(logginButton).not.toHaveText("Logout");
  await expect(logginButton).toHaveText("Login");
});
