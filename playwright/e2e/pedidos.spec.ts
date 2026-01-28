import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-3ZKFYN')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  // Assert 

  const toContainerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido/ })
    .locator('..')  // Sobe para o elemento pai (a div que agrupa ambos)

  await expect(toContainerPedido).toContainText('VLO-3ZKFYN', { timeout: 10_000 })

  await expect(page.getByText('APROVADO')).toBeVisible();

})