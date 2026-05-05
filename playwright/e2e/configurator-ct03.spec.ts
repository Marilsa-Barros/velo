import { test, expect } from '../support/fixtures'

test.describe('CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/configure');
  })

  test('deve atualizar o preço ao marcar/desmarcar opcionais e persistir no checkout', async ({ page }) => {
 
    // Checkpoint: estamos no configurador e preço base está correto
    await expect(page.getByText('Preço de Venda')).toBeVisible();
    await expect(page.getByText('R$ 40.000,00')).toBeVisible();

    const precisionPark = page.getByRole('checkbox', { name: /Precision Park/i });
    const fluxCapacitor = page.getByRole('checkbox', { name: /Flux Capacitor/i });

    // Passo 1: marcar Precision Park (+ R$ 5.500,00)
    await expect(precisionPark).toBeVisible();
    await precisionPark.check();
    await expect(page.getByText('R$ 45.500,00')).toBeVisible();

    // Passo 2: marcar Flux Capacitor (+ R$ 5.000,00)
    await expect(fluxCapacitor).toBeVisible();
    await fluxCapacitor.check();
    await expect(page.getByText('R$ 50.500,00')).toBeVisible();

    // Passo 3: desmarcar ambos e retornar ao preço base
    await precisionPark.uncheck();
    await fluxCapacitor.uncheck();
    await expect(page.getByText('R$ 40.000,00')).toBeVisible();

    // Passo 4: ir para checkout e validar persistência
    const checkoutButton = page.getByRole('button', { name: 'Monte o Seu' });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    
    await expect(page.getByRole('heading', { name: 'Resumo' })).toBeVisible();
    await expect(page.getByText('Total')).toBeVisible();
    await expect(page.getByTestId('summary-total-price')).toHaveText('R$ 40.000,00');
    await expect(page.getByTestId('payment-avista')).toContainText('R$ 40.000,00');
  });
});
