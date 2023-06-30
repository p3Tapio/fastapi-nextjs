describe('Navbar items', function () {
  it('Contains sign in link when unauthenticated', function () {
    cy.visit('http://localhost:3001/')
    cy.get('.navbar-container').contains('Sign in')
  })
  it('Does not contain secrets when unauthenticated', function () {
    cy.visit('http://localhost:3001/')
    cy.get('.navbar-container').contains('User page').should('not.exist')
  })
})

describe('Sign in', function () {
  it('Sign in window opens', function () {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('.auth-container__form').contains('Email')
    cy.get('.auth-container__form').contains('Password')
    cy.get('.auth-container__button-div').contains('Sign in')
    cy.get('.auth-container__button-div').contains('Reset')
  })
  it('User can sign in', function () {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('#auth-email').type('aku.ankka@email.com')
    cy.get('#auth-password').type('salasana')
    cy.get('#auth-submit').click()
    cy.get('.navbar-container').contains('User page')
  })
  it('User can\'t sign in with wrong details', function() {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('#auth-email').type('wrong@user.com')
    cy.get('#auth-password').type('invalid')
    cy.get('#auth-submit').click()
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('.auth-container__error-message').contains('Sign in failed. Try again.')
  })
})
