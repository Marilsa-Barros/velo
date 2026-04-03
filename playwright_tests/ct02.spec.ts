import { test, expect } from '@playwright/test';

test('CT02 - Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', async ({ page }) => {
  // Step 1: Navigating and checking initial price
  await page.goto('http://localhost:5173/configure');
  const totalPriceLocator = page.getByTestId('total-price');
  await expect(totalPriceLocator).toContainText('40.000,00');
  await page.screenshot({ path: 'docs/evidence/CT02_step1_initial.png' });

  // Step 2: Selecting a different color ("Midnight Black")
  await page.getByTestId('color-option-midnight-black').click();
  // Wait to ensure UI changes are rendered
  await page.waitForTimeout(500); 
  await expect(totalPriceLocator).toContainText('40.000,00');
  await page.screenshot({ path: 'docs/evidence/CT02_step2_color_changed.png' });

  // Step 3: Selecting "Sport Wheels"
  await page.getByTestId('wheel-option-sport').click();
  await page.waitForTimeout(500);
  await expect(totalPriceLocator).toContainText('42.000,00');
  await page.screenshot({ path: 'docs/evidence/CT02_step3_sport_wheels.png' });

  // Step 4: Selecting "Aero Wheels"
  await page.getByTestId('wheel-option-aero').click();
  await page.waitForTimeout(500);
  await expect(totalPriceLocator).toContainText('40.000,00');
  await page.screenshot({ path: 'docs/evidence/CT02_step4_aero_wheels.png' });
});
