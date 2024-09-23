import { test, expect } from "@playwright/test";

test("Selecionar e preencher um elemento", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/forgot_password");

  // Um objeto label tem sempre o atributo 'for', que aponta para um id de um
  // input.
  await page.getByLabel("E-mail").fill("yuri@gmail.com");

  // Limpar um elemento
  await page.locator("#email").clear();

  // Digitar sequencialmente as letras, conforme um usuário faria com delay entre
  // as teclas.
  await page
    .locator("#email")
    .pressSequentially("yuriespinosapires@gmail.com", { delay: 1000 });
});

test("Checkboxes", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com");

  const checkboxesLink = page.locator('a[href="/checkboxes"]');
  await checkboxesLink.click();

  // checkboxes em tela
  // serão selecionados mais de um
  const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
  const checkbox2 = page.locator('input[type="checkbox"]').nth(1);

  await checkbox1.check();
  await expect(checkbox1).toBeChecked;

  await checkbox2.uncheck();
  await expect(checkbox2).not.toBeChecked;
});
