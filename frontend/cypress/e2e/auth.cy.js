describe('Navbar items', function () {
  before(() => {
    cy.request('GET', 'http://localhost:8000/test/clear-db')
  })

  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  after(() => {
    cy.request('GET', 'http://localhost:8000/test/clear-db')
  })

  it('Contains sign in and register links when unauthenticated', function () {
    cy.visit('http://localhost:3000/')
    cy.get('#sign-in').should('exist')
    cy.get('#register').should('exist')
  })
  it('Does not contain user page when unauthenticated', function () {
    cy.visit('http://localhost:3000/')
    cy.get('#user-page').should('not.exist')
  })
})

describe('Register', function () {
  it('Register window opens', function () {
    cy.visit('http://localhost:3000/register')
    cy.get('.auth-container__form').contains('Username')
    cy.get('.auth-container__form').contains('Email')
    cy.get('.auth-container__form').contains('Password')
    cy.get('.auth-container__form').contains('Password again')
    cy.get('.auth-container__buttons').contains('Register')
    cy.get('.auth-container__buttons').contains('Reset')
  })
  it('User can register with valid details', function () {
    cy.visit('http://localhost:3000/register')
    cy.get('#auth-username').type('username-x')
    cy.get('#auth-email').type('example@user.com')
    cy.get('#auth-password').type('secret-salasana')
    cy.get('#auth-password-again').type('secret-salasana')
    cy.get('#auth-submit').click()
    cy.get('#user-page', { timeout: 10000 }).should('be.visible');
  })
  it("User can't register without username", function () {
    cy.visit('http://localhost:3000/register')
    cy.get('#auth-email').type('example@user.com')
    cy.get('#auth-password').type('secret-salasana')
    cy.get('#auth-password-again').type('secret-salasana')
    cy.get('#auth-submit').should('be.disabled')
  })
  it("User can't register with mismatching passwords", function () {
    cy.visit('http://localhost:3000/register')
    cy.get('#auth-username').type('username-x')
    cy.get('#auth-email').type('example@user.com')
    cy.get('#auth-password').type('secret')
    cy.get('#auth-password-again').type('secret-salasana')
    cy.get('#auth-submit').should('be.disabled')
  })
})

describe('Sign in', function () {
  it('Sign in window opens', function () {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('.auth-container__form').contains('Email')
    cy.get('.auth-container__form').contains('Password')
    cy.get('.auth-container__buttons').contains('Sign in')
    cy.get('.auth-container__buttons').contains('Reset')
  })
  it('User can sign in', function () {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('#user-page').should('not.exist')
    cy.get('#auth-email').type('example@user.com')
    cy.get('#auth-password').type('secret-salasana')
    cy.get('#auth-submit').click()
    cy.get('#user-page', { timeout: 10000 }).should('be.visible');
  })
  it("User can't sign in with wrong details", function () {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('#user-page').should('not.exist')
    cy.get('#auth-email').type('wrong@user.com')
    cy.get('#auth-password').type('invalid')
    cy.get('#auth-submit').click()
    cy.get('#user-page').should('not.exist')
    cy.get('.auth-container__error-message').contains('Sign in failed. Try again.')
  })
})
