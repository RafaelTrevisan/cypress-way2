// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {validateSchema} from './validateSchema'

//Validar schema
Cypress.Commands.add('validateSchema', validateSchema)

//Acessar página inicial
Cypress.Commands.add('homePage', () => {
    cy.visit('https://eway2-api-teste.azurewebsites.net/swagger/index.html')      
    cy.title().should('eq','Swagger UI')
})

//Abrir menus somente com botões
Cypress.Commands.add('openMenu', (menu) => {
    cy.contains('button div', menu).should('be.visible').click()
    cy.contains('div button', 'Try it out').should('be.visible').click()
    cy.contains('div button', 'Execute').should('be.visible').click()
})

//Fechar menus somente com botões
Cypress.Commands.add('closeMenu', (menu) => {
    cy.contains('div button', 'Clear').should('be.visible').click().should('not.exist')
    cy.contains('div button', 'Cancel').should('be.visible').click()
    cy.contains('div button', 'Try it out').should('be.visible')
    cy.contains('button div', menu).should('be.visible').click()
})

//Abrir menus e incluir sku e quantidade
Cypress.Commands.add('AddProductQtd', (menu, sku, qtd) => {
    cy.contains('button div', menu).should('be.visible').click()
    cy.contains('div button', 'Try it out').should('be.visible').click()
    cy.get('input[placeholder=skuProduto').should('be.visible').type(sku)
    cy.get('input[placeholder=quantidade').should('be.visible').type(qtd)
    cy.contains('div button', 'Execute').should('be.visible').click()
})

//Abrir menus e incluir descricao
Cypress.Commands.add('AddDesc', (menu, desc) => {
    cy.contains('button div', menu).should('be.visible').click()
    cy.contains('div button', 'Try it out').should('be.visible').click()
    cy.get('input[placeholder=descricao').should('be.visible').type(desc)
    cy.contains('div button', 'Execute').should('be.visible').click()
})

//Listar produtos
Cypress.Commands.add('listProduct', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/produto',
        method: 'GET'
    }).then(({status, body}) => {
        expect(status).to.equal(200)
        cy.validateSchema('produtosSchema', body)
    })
})

//Verificar estoque
Cypress.Commands.add('checkStock', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/produto/Microondas%20Mondial/estoque',
        method: 'GET'
    }).then(({status, body}) => {
        expect(status).to.equal(200)
        cy.validateSchema('estoqueSchema', body)
    }) 
})

//Adicionar produto no carrinho
Cypress.Commands.add('addProductToCar', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/compra/carrinho/123/adicionarProduto?quantidade=1',
        method: 'POST'
    }).then(({status}) => {
        expect(status).to.equal(200)
    })
})

//Deletar produto no carrinho
Cypress.Commands.add('delProductToCar', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/compra/carrinho/123/removerProduto?quantidade=1',
        method: 'DELETE'
    }).then(({status}) => {
        expect(status).to.equal(200)
    })
})

//Listar produtos do carrinho
Cypress.Commands.add('listProductToCar', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/produto',
        method: 'GET'
    }).then(({status, body}) => {
        expect(status).to.equal(200)
        cy.validateSchema('produtosSchema', body)
    })
})

//Finalizar compra
Cypress.Commands.add('finishBuy', () => {
    cy.request({
        url:'https://eway2-api-teste.azurewebsites.net/compra/finalizar',
        method: 'POST'
    }).then(({status}) => {
        expect(status).to.equal(200)
    })
})

//Validar campo obritório
Cypress.Commands.add('validField', (menu) => {
    cy.contains('button div', menu).should('be.visible').click()
    cy.contains('div button', 'Try it out').should('be.visible').click()
    cy.get('input[placeholder=skuProduto').should('be.visible')
    cy.get('input[placeholder=quantidade').should('be.visible')
    cy.contains('div button', 'Execute').should('be.visible').click()
})
