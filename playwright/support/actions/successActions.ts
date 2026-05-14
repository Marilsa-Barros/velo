import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
  return {
    async expectLoaded() {
      await expect(page).toHaveURL(/\/success/)
    },

    async expectApproved() {
      await this.expectLoaded()
      await expect(page.getByRole('heading', { name: /Pedido Aprovado/i })).toBeVisible()
    },

    async expectRejected() {
      await this.expectLoaded()
      await expect(page.getByRole('heading', { name: /Crédito Reprovado/i })).toBeVisible()
    },

    async expectInReview() {
      await this.expectLoaded()
      await expect(page.getByRole('heading', { name: /Pedido em Análise/i })).toBeVisible()
    }
  }
}
