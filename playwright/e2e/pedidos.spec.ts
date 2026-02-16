import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'



/// AAA - Arrange, Act, Assert

test.describe('Consultar Pedido', () => {


  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Fata
    // const order = 'VLO-3ZKFYN'

    const order = {
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
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

   
    // validação dos elementos de forma dinamica com snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

     await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Fata
    //const order = 'VLO-HXRRWE'

    const order = {
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
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

   
    // validação dos elementos de forma dinamica com snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Fata
    //const order = 'VLO-HXRRWE'

    const order = {
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
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)


    // validação dos elementos de forma dinamica com snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)
  
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

  })

})
