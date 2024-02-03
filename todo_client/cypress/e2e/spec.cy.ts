import '@testing-library/cypress/add-commands'

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/auth')
  })
  it('register user', () => {
    cy.findByTestId('link-register').click()
    cy.findByTestId('username').type('Miguel')
    cy.findByTestId('password').type('123456')
    cy.findByTestId('btn-register').click()
  })
  it('check login', () => {
    cy.findByTestId('username').click()
  })
  it('auth user', () => {
    cy.findByTestId('username').type('Miguel')
    cy.findByTestId('password').type('123456')
    cy.findByTestId('btn-login').click().should('be.visible')
  })
})