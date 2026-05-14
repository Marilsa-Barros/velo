import { test as base } from '@playwright/test'

import { createCheckoutActions } from './actions/checkoutActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderLockupActions } from './actions/orderLookupActions'
import { createSuccessActions } from './actions/successActions'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLookup: ReturnType<typeof createOrderLockupActions>
  success: ReturnType<typeof createSuccessActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      orderLookup: createOrderLockupActions(page),
      success: createSuccessActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'

