/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import Utils from '../../support/utils';

describe('test suite', () => {
  beforeEach(() => {
    cy.visit(urls.userinyerface);
  });

  it('help form test', () => {
    cy.get('.start__button').should('exist');
    cy.get('.start__link').click();
    cy.get('.game').should('exist');
    cy.get('a[class*="help-button"]').click();
    cy.get('.help-form__response').should('be.visible');
  });

  it('timer test', () => {
    cy.get('.start__button').should('exist');
    cy.get('.start__link').click();
    cy.get('.game').should('exist');
    cy.get('.timer').should('have.text', '00:00:00');
  });

  it('valid password test', () => {
    cy.get('.start__button').should('exist');
    cy.get('.start__link').click();
    cy.get('.game').should('exist');
    let randomEmail = Utils.generateRandomString(5);
    let randomDomain = Utils.generateRandomString(5);
    cy.get('input[placeholder="Your email"]').clear().type(randomEmail);
    cy.get('input[placeholder="Domain"]').clear().type(randomDomain);
    cy.selectRandomSuffix();
    let randomPassword = Utils.generateRandomPassword(10, randomEmail);
    cy.get('input[placeholder="Choose Password"]').clear().type(randomPassword);
    cy.get('#accept-terms-conditions').uncheck({ force: true });
    cy.contains('Next').click();
    cy.get('.page-indicator').should('have.text', '2 / 4');
  });

  it('invalid password test', () => {
    cy.get('.start__button').should('exist');
    cy.get('.start__link').click();
    cy.get('.game').should('exist');
    let randomEmail = Utils.generateRandomString(5);
    let randomDomain = Utils.generateRandomString(5);
    cy.get('input[placeholder="Your email"]').clear().type(randomEmail);
    cy.get('input[placeholder="Domain"]').clear().type(randomDomain);
    cy.selectRandomSuffix();
    let invalidRandomPassword = Utils.generateRandomString(5);
    cy.get('input[placeholder="Choose Password"]').clear().type(invalidRandomPassword);
    cy.get('#accept-terms-conditions').uncheck({ force: true });
    cy.contains('Next').click();
    cy.get('.page-indicator').should('not.have.text', '2 / 4');
  });
});
