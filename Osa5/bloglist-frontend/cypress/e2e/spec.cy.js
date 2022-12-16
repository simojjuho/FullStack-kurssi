/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //Creating a new user for testing
    const newUserObject = {
      username: 'root',
      name: 'root',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', newUserObject)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginVisible')
  })

  it('login succesful', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('secret')
    cy.get('#loginSubmit').click()
    cy.contains('root logged in')
  })

  it('not succesful with wrong credentials', function() {
    cy.get('#username').type('juho')
    cy.get('#password').type('secret')
    cy.get('#loginSubmit').click()
    cy.contains('Unauthorized, wrong username and/or password')
  })
})