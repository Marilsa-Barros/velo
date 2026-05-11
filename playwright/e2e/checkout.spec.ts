import { test, expect } from '../support/fixtures'
import { deleteOrderByCpf } from '../support/database/orderRepository'

test.describe('Checkout', () => {



    test.describe('Validações de campos obrigatórios', () => {

        let alerts: any

        test.beforeEach(async ({ page, app }) => {
            await page.goto('/order')
            await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()

            alerts = app.checkout.elements.alerts
        })


        test('deve validar obrigatoriedade de todos os campos em branco', async ({ app }) => {
            // Act
            await app.checkout.submit()
            // Assert
            await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
            await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
            await expect(alerts.email).toHaveText('Email inválido')
            await expect(alerts.phone).toHaveText('Telefone inválido')
            await expect(alerts.document).toHaveText('CPF inválido')
            await expect(alerts.store).toHaveText('Selecione uma loja')
            await expect(alerts.terms).toHaveText('Aceite os termos')
        })

        test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ app }) => {

            const customer = {
                name: 'A',
                lastname: 'B',
                email: 'marilsa@teste.com',
                document: '52998224725',
                phone: '(11) 99999-9999',

            }

            // Arrange
            await app.checkout.fillCustomerData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            //Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
            await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
        })

        test('deve exibir erro para e-mail com formato inválido', async ({ app }) => {
            const customer = {
                name: 'Marilsa',
                lastname: 'Barros',
                email: 'marilsa@.com',
                document: '52998224725',
                phone: '(11) 99999-9999',
            }

            // Arrange
            await app.checkout.fillCustomerData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            //Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.email).toHaveText('Email inválido')
        })

        test('deve exibir erro para CPF inválido', async ({ page, app }) => {

            const customer = {
                name: 'Marilsa',
                lastname: 'Barros',
                email: 'marilsa@teste.com',
                document: '52998224799',
                phone: '(11) 99999-9999',
            }

            // Arrange
            await app.checkout.fillCustomerData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            //Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.document).toHaveText('CPF inválido')
        })

        test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ app }) => {

            const customer = {
                name: 'Marilsa',
                lastname: 'Barros',
                email: 'marilsa@teste.com',
                document: '52998224725',
                phone: '(11) 99999-9999',
            }

            // Arrange
            await app.checkout.fillCustomerData(customer)
            await app.checkout.selectStore('Velô Paulista')

            await expect(app.checkout.elements.terms).not.toBeChecked()

            // Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.terms).toHaveText('Aceite os termos')
        })

    })


    test.describe('Pagamento e Confirmação', () => {

        test('deve criar um pedido com sucesso para pagamento à vista', async ({ page, app }) => {

            const customer = {
                name: 'Marilsa',
                lastname: 'Barros',
                email: 'marilsab@teste.com',
                document: '32908711001',
                phone: '(11) 99999-9999',
                store: 'Velô Paulista',
                paymentMethod: 'À Vista',
                totalPrice: 'R$ 40.000,00'
            }

            // Database setup
            await deleteOrderByCpf(customer.document)

            // Arrange
            await page.goto('/')
            await page.getByRole('link', { name: /Configure Agora/i }).click()

            await app.configurator.expectPrice(customer.totalPrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.fillCustomerData(customer)
            await app.checkout.selectStore(customer.store)

            // Act
            await app.checkout.selectPaymentMethod(customer.paymentMethod)
            await app.checkout.expectSummaryTotal(customer.totalPrice)
            await app.checkout.acceptTerms()
            await app.checkout.submit()

            // Assert
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: 'Pedido Aprovado!' })).toBeVisible()
        })
    })
})