/// <reference types="cypress" />

describe('Way2', () => {
    beforeEach(() => {
        cy.homePage()
        cy.viewport(1920, 1080)
    })

    context('Produto', () => {
        it('Retornar lista de produtos', () => {

            const menu = 'Retorna uma lista de produtos'

            cy.openMenu(menu)

            cy.listProduct()
            
            cy.closeMenu(menu)
        })
        it('Verifica a existência de estoque de um produto', () => {
            
            const menu = 'Verifica a existencia de estoque de um produto'
            const desc = 'Microondas Mondial'

            cy.AddDesc(menu, desc)
            //Validação do schema
            cy.checkStock()
           
            cy.closeMenu(menu)

        });
    })

    context('Compra', () => {
        it('Adicionar um produto no carrinho', () => {
            
            const menu = 'Adiciona um produto ao carrinho'
            const result = 'Produto 123 adicionado ao carrinho com sucesso'

            const sku = '123'
            const qtd = '1'
            
            cy.AddProductQtd(menu, sku, qtd)

            cy.contains(result).should('be.visible')
            
            cy.addProductToCar()

            cy.closeMenu(menu)
        });

        it('Remover um produto do carrinho', () => {

            const menu = 'Remove um produto do carrinho'
            const result = 'Produto 123 removido do carrinho com sucesso'
            
            const sku = '123'
            const qtd = '1'

            cy.AddProductQtd(menu, sku, qtd)

            cy.contains(result).should('be.visible')

             //Validação código de retorno
            cy.delProductToCar()
            
            cy.closeMenu(menu)
        });

        it('Lista produtos do carrinho', () => {
            
            const menu = 'Lista os produtos do carrinho'

            cy.openMenu(menu)

            cy.listProductToCar()

            cy.closeMenu(menu)
        });

        it('Finaliza compra', () => {

            const menu = 'Finaliza uma compra'
            const result = 'Compra finalizada com sucesso'

            cy.openMenu(menu)

            cy.contains(result).should('be.visible')

            cy.finishBuy()
            
            cy.closeMenu(menu)
        });

        it('Validar campo obrigatório', () => {
            const menu = 'Remove um produto do carrinho'

            cy.validField(menu)

            cy.get('.invalid').should('be.visible')
        });

        it('Validar produto incorreto', () => {
            const menu = 'Verifica a existencia de estoque de um produto'
            const desc = 'teste'
            const result = 'Não foi encontrado estoque disponível para o produto teste'

            cy.AddDesc(menu, desc)

            cy.checkStockInvalid()

            cy.contains(result).should('be.visible')

            cy.closeMenu(menu)
            
        });
    });
       
});    
