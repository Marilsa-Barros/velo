import { test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLockupActions'

test.describe('Consultar Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    await app.orderLockup.open() 
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

    // Test Data  
    const order: OrderDetails = {
      number: 'VLO-3ZKFYN',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Marilsa Barros',
        email: 'marilsa@velo.dev',
      },
      payment: 'À Vista',
    }


    // Act
    await app.orderLockup.searchOrder(order.number)
    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
     const order: OrderDetails = {
      number: 'VLO-HXRRWE',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'WASHINGTON SANTOS',
        email: 'wa@gamil.com',
      },
      payment: 'À Vista',
    }

    // Act
    await app.orderLockup.searchOrder(order.number)
    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-9VNQ7P',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Pedro da Silva',
        email: 'pedro@velo.com',
      },
      payment: 'À Vista',
    }


    // Act
     await app.orderLockup.searchOrder(order.number)
    // Assert
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  
  })

  test('deve exibir mensagem quando o código do pedido está fora dopadrão', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  
  })

})
