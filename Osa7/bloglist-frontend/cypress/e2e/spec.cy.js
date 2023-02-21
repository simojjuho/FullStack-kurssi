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

  describe('Login', function() {
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


  describe('When logged in', function() {
    beforeEach(function(){
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#loginSubmit').click()
    })
    it('blog creation succesful', function() {
      cy.get('#titleInput').type('Kekkonen lives!')
      cy.get('#authorInput').type('A. Saarikko')
      cy.get('#urlInput').type('kepu.com/')
      cy.get('#createBlogButton').click()
      cy.contains('Kekkonen lives! A. Saarikko')
    })
  })

  describe('One blog created', function(){
    beforeEach(function(){
      //These should be done by some other way than these test methods. Will have to learn those too at some point.
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#loginSubmit').click()
      cy.get('#titleInput').type('Kekkonen lives!')
      cy.get('#authorInput').type('A. Saarikko')
      cy.get('#urlInput').type('kepu.com/')
      cy.get('#createBlogButton').click()
      cy.get('button.viewMoreButton').click()
    })

    it('pressing like adds one like', function(){
      cy.get('button.addLike').click()
      cy.contains('Likes: 1')
    })

    it('deletion possible for the one who created the blog', function(){
      cy.get('.deleteButton').click()
      cy.expect('#blogList').to.not.contain('Kekkonen lives!')
    })
  })
  describe('Two blogs created', function() {
    beforeEach(function(){
      //These should be done by some other way than these test methods. Will have to learn those too at some point.
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#loginSubmit').click()
      cy.get('#titleInput').type('Should be second!')
      cy.get('#authorInput').type('Second')
      cy.get('#urlInput').type('second.com/')
      cy.get('#createBlogButton').click()
      cy.get('#titleInput').type('Should be first!')
      cy.get('#authorInput').type('First')
      cy.get('#urlInput').type('first.com/')
      cy.get('#createBlogButton').click()
      cy.get('button.viewMoreButton').click()
    })
    it('The blog second should be first on the list when with more likes', function() {
      cy.contains('Second')
        .then(() => {
          cy.get('.addLike').click()
        })
      cy.contains('First').get('.viewMoreButton').click()
      cy.get('.blog:last').get('.addLike:last').click()
      cy.get('.blog:last').get('.addLike:last').click()
      cy.get('.blog:first').contains('First')
    })
  })
})
