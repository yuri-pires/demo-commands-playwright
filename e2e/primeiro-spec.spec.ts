import test, { expect } from "@playwright/test";

test("visitando página do playwright", async ({ page }) => {
  await page.goto("https://playwright.dev");

  // page locator funciona como o cy.get() com css puro
  await page.locator(".getStarted_Sjon").click();

  // filtra um elemento pelo texto dele
  // <span> Hello </hello>
  await page.getByText("Get started").click();

  // role "a" corresponde ao nome link, com um "name"(texto visivel) de get
  // started em case sensitive
  await page.getByRole("link", { name: "Get started" }).click();

  // Quando tivermos campos de input, geralmente temos uma label, e podemos usar o seletor
  // especifico de campos de entrada label
  // <label>Password <input type="password" /></label>
  await page.getByLabel("Password").fill("secret");

  // Buscando por placeholder de inputs
  //<input type="email" placeholder="name@example.com" />
  await page
    .getByPlaceholder("name@example.com")
    .fill("playwright@microsoft.com");

  // localizar pelo alt tex de imagens
  // <img alt="playwright logo" src="/img/playwright-logo.svg" width="100" />
  await page.getByAltText("playwright logo").click();

  //localizar um elemento pelo atributo title html
  //<span title='Issues count'>25 issues</span>
  await expect(page.getByTitle("Issues count")).toHaveText("25 issues");

  const texto = await page
    .getByText("enables reliable end-to-end testing for modern web apps.")
    .textContent();

  console.log(texto);
});
