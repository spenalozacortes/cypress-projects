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
import Utils from '../support/utils';

Cypress.Commands.add('selectRandomSuffix', () => {
    cy.get('.dropdown__list-item').then($elements => {
      cy.wrap($elements.eq(Utils.generateRandomInt($elements.length))).click({ force: true });
    });
});

Cypress.Commands.add('selectNewsletter', (newsletter) => {
  cy.get('.p-8').each(($el, index, $list) => {
    if ($el.find('h2').text().includes(newsletter)) {
        cy.wrap($el.find('.btn-tertiary')).click();
        // “Select this newsletter” is changed to “Chosen”. 
        expect($el.find('.checked-label').text()).to.contain('Chosen');
    }
  });
});

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