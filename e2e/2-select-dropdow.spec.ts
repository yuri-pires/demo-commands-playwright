import test, { expect } from "@playwright/test";

test("Ações com dropdows e hover", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dropdown");

  const dropdown = page.locator("#dropdown");
  await dropdown.selectOption("1");
  await expect(dropdown).toHaveValue("1");

  // Aqui selecionamos pelo texto entre tags
  await dropdown.selectOption({ label: "Option 2" });
  await expect(dropdown).toHaveValue("2");
});
