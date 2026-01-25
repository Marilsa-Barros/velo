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
  await expect(page.locator('div').filter({ hasText: /^PedidoVLO-3ZKFYN$/ }).first()).toBeVisible({timeout: 5_000})
  await expect(page.locator('div').filter({ hasText: /^PedidoVLO-3ZKFYN$/ }).first()).toHaveText('PedidoVLO-3ZKFYN')
 
  await expect(page.getByText('PedidoVLO-3ZKFYNAPROVADO')).toBeVisible({timeout: 5_000})
  await expect(page.getByText('PedidoVLO-3ZKFYNAPROVADO')).toContainText('APROVADO')
})