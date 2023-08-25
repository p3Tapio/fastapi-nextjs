describe('User can create post', function () {
  before(() => {
    cy.clearLocalStorageSnapshot()
    cy.request('GET', 'http://localhost:8000/test/clear-db')
    cy.request('GET', 'http://localhost:8000/test/add-users')
    cy.visit('http://localhost:3001/sign-in')
    cy.get('#auth-email').type('test@email.com')
    cy.get('#auth-password').type('super-secret')
    cy.get('#auth-submit').click()
  })

  after(() => {
    cy.request('GET', 'http://localhost:8000/test/clear-db')
  })

  it('User can create post', function () {
    cy.get('#toggle-posts').click()
    cy.get('#new-post-title').type('Test title')
    cy.get('#new-post-description').type('Test description')
    cy.get('#save-new-post').click()
    cy.get('.userposts-item').contains('Test title')
    cy.get('.userposts-item').contains('Test description')
  })

  it("Another user won't see a private post", function () {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('#auth-email').type('test_2@email.com')
    cy.get('#auth-password').type('another-secret')
    cy.get('#auth-submit').click()
    cy.get('.navbar-container').contains('User page')
    cy.get('.userposts-item').should('not.exist')
  })

  it('User can update post', function () {
    cy.visit('http://localhost:3001/sign-in')
    cy.get('#auth-email').type('test@email.com')
    cy.get('#auth-password').type('super-secret')
    cy.get('#auth-submit').click()
    cy.get('#update-post-btn').click()
    cy.get('#new-post-title').clear()
    cy.get('#new-post-title').type('Updated title')
    cy.get('#new-post-description').clear()
    cy.get('#new-post-description').type('Updated description')
    cy.get('#save-new-post').click()
    cy.get('.userposts-item').contains('Updated title')
    cy.get('.userposts-item').contains('Updated description')
    cy.saveLocalStorage()
  })

  it('User can delete post', function () {
    cy.restoreLocalStorage()
    cy.visit('http://localhost:3001/user-page')
    cy.get('#delete-post-btn').click()
    cy.get('.userposts-item').should('not.exist')
  })
})
