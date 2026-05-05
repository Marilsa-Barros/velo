import { Page, expect } from '@playwright/test'

export type OptionalId = 'precision-park' | 'flux-capacitor'

export function createConfiguratorActions(page: Page) {
  const precisionPark = page.getByTestId('opt-precision-park')
  const fluxCapacitor = page.getByTestId('opt-flux-capacitor')
  const checkoutButton = page.getByTestId('checkout-button')

  return {

    async open() {
      await page.goto('/configure')
    },

    async selectColor(name: string) {
      await page.getByRole('button', { name }).click()
    },

    async selectWheels(name: string | RegExp) {
      await page.getByRole('button', { name }).click()
    },

    async expectPrice(price: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },

    async toggleOptional(id: OptionalId) {
      const checkbox = page.getByTestId(`opt-${id}`)
      await expect(checkbox).toBeVisible()
      await checkbox.click()
    },

    async expectOptionalChecked(id: OptionalId, checked: boolean) {
      const checkbox = page.getByTestId(`opt-${id}`)
      await expect(checkbox).toBeChecked({ checked })
    },

    async goToCheckout() {
      await expect(checkoutButton).toBeVisible()
      await checkoutButton.click()
    },

    async expectCheckoutSummary(total: string) {
      await expect(page.getByRole('heading', { name: 'Resumo' })).toBeVisible()
      await expect(page.getByText('Total')).toBeVisible()
      await expect(page.getByTestId('summary-total-price')).toHaveText(total)
    },

    async expectPaymentAvista(total: string) {
      await expect(page.getByTestId('payment-avista')).toContainText(total)
    },
  }
}
