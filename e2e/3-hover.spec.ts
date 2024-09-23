import test, { expect } from "@playwright/test";
import exp from "constants";

test("Testes com hover", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");

  const image1 = page.locator("div.figure").nth(0);
  // figcapiton é a classe de um elemento div, contendo informações da imagem
  // que ocorreu o hover.
  // Aqui nós estendemos o novo locator a partir de outro locator, em suma,
  // é uma boa prática declarar o locator em um constante, e após isso, executar
  // os comandos nessa constante, aplicando reuso de código.
  // Quando chamamos um locator declarado com um novo comando .locator,
  // estamos buscando um elemento HTML dentro desse locator já declarado
  const hoverInfo1 = image1.locator("div.figcaption");

  await image1.hover();
  await expect(hoverInfo1).toBeVisible;
  // Como temos somente 1 link, não precisamos passar o {} options, é opcional
  await hoverInfo1.getByRole("link", { name: "View profile" }).click();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/users/1");
});
