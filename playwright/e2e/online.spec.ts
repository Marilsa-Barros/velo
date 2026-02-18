import { test, expect } from '../support/fixtures'

test('webapp deve estar online', async ({ page, app }) => {
  await app.orderLockup.open()

  await expect(page).toHaveTitle(/Velô by Papito/)
})
