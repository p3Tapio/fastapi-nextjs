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
    cy.get('.signin-container__form').contains('Email')
    cy.get('.signin-container__form').contains('Password')
    cy.get('.signin-container__button-div').contains('Sign in')
    cy.get('.signin-container__button-div').contains('Reset')
  })
  it('User can sign in', function () {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('#signin-email').type('aku.ankka@email.com')
    cy.get('#signin-password').type('salasana')
    cy.get('#signin-submit').click()
    cy.get('.navbar-container').contains('User page')
  })
  it('User can\'t sign in with wrong details', function() {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('#signin-email').type('wrong@user.com')
    cy.get('#signin-password').type('invalid')
    cy.get('#signin-submit').click()
    cy.get('.navbar-container').contains('User page').should('not.exist')
    cy.get('.signin-container__error-message').contains('Sign in failed. Try again.')
  })
})
