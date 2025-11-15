import { test, expect } from '@playwright/test';

// Define a URL base do nosso PWA, que estará rodando no Docker
const PWA_URL = 'http://localhost:8080';

test.describe('Productivity Hub E2E Test', () => {

  test('Deve carregar a página e o título corretamente', async ({ page }) => {
    await page.goto(PWA_URL);
    await expect(page).toHaveTitle(/Productivity Hub PWA/);
    await expect(page.locator('h1')).toHaveText('Productivity Hub');
  });

  test('Deve carregar e exibir as tarefas da API', async ({ page }) => {
    await page.goto(PWA_URL);
    
    // Procura pela primeira tarefa que vem da API
    await expect(page.locator('li >> text=Configurar o backend!'))
      .toBeVisible({ timeout: 10000 });
  });

  test('Deve adicionar uma nova tarefa', async ({ page }) => {
    await page.goto(PWA_URL);

    // Encontra o campo de input e o botão
    const input = page.locator('input[placeholder="O que precisa ser feito?"]');
    const button = page.locator('button[type="submit"]');

    // Digita a nova tarefa e clica em adicionar
    const novaTarefa = "Testar o PWA com Playwright";
    await input.fill(novaTarefa);
    await button.click();

    // Verifica se a nova tarefa apareceu na lista
    await expect(page.locator(`li >> text=${novaTarefa}`))
      .toBeVisible();
  });
});