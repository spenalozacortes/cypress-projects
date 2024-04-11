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
import utils from '../support/utils';
import { userinyerface } from './locators';
import { euronews } from './locators';
import { assertions } from '../e2e/euronews/assertionData';

Cypress.Commands.add('selectRandomSuffix', () => {
    cy.get(userinyerface.domainDropdown).click();
    cy.get(userinyerface.domains).then($elements => {
      cy.wrap($elements.eq(utils.generateRandomInt($elements.length))).click();
    });
});

Cypress.Commands.add('selectNewsletter', (newsletter) => {
  cy.get(euronews.newsletters).each(($el, index, $list) => {
    if ($el.find(euronews.newsletterText).text().includes(newsletter)) {
        cy.wrap($el.find(euronews.newsletterButton)).click();
        // “Select this newsletter” is changed to “Chosen”. 
        expect($el.find(euronews.chosenText).text()).to.contain(assertions.chosenText);
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