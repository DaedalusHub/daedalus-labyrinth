import React from 'react'
import InputForm from './index'

describe('<InputForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InputForm />)
  })
})