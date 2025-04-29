/// <reference types="cypress"/>

describe('cenário de teste', () => {

  it('Testando registro, deleção e falha no login', () => {
    let info = register() // [username, password]

    // Login com sucesso
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])

    // Deletar usuário
    cy.contains('Delete').click()
    cy.get('.btn').click() // confirmar logout

    // Tentar login novamente com as mesmas credenciais
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()

    // Verificar mensagem de falha
    cy.get('.alert-danger')
      .should('exist')
      .and('contain.text', 'Username or password is incorrect')
  })

})

function register() {
  let secs = new Date().getSeconds().toString()
  let min = new Date().getMinutes().toString()
  let hours = new Date().getHours().toString()

  let user = hours + min + secs + 'Id'
  let password = hours + min + secs + 'Senha'
  let userInfo = [user, password]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo
}
