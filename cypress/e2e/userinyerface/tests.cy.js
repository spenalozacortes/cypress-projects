/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const digits = '1234567890';

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
    let randomEmail = generateRandomString(5);
    let randomDomain = generateRandomString(5);
    cy.get('input[placeholder="Your email"]').clear().type(randomEmail);
    cy.get('input[placeholder="Domain"]').clear().type(randomDomain);
    selectRandomSuffix();
    let randomPassword = generateRandomPassword(10, randomEmail);
    cy.get('input[placeholder="Choose Password"]').clear().type(randomPassword);
    cy.get('#accept-terms-conditions').uncheck({ force: true });
    cy.contains('Next').click();
    cy.get('.page-indicator').should('have.text', '2 / 4');
  });

  it('invalid password test', () => {
    cy.get('.start__button').should('exist');
    cy.get('.start__link').click();
    cy.get('.game').should('exist');
    let randomEmail = generateRandomString(5);
    let randomDomain = generateRandomString(5);
    cy.get('input[placeholder="Your email"]').clear().type(randomEmail);
    cy.get('input[placeholder="Domain"]').clear().type(randomDomain);
    selectRandomSuffix();
    let invalidRandomPassword = generateRandomString(5);
    cy.get('input[placeholder="Choose Password"]').clear().type(invalidRandomPassword);
    cy.get('#accept-terms-conditions').uncheck({ force: true });
    cy.contains('Next').click();
    cy.get('.page-indicator').should('not.have.text', '2 / 4');
  });
});

function generateRandomInt(range) {
  return Math.floor(Math.random() * range);
}

function generateRandomString(length) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += letters.charAt(generateRandomInt(letters.length));
  }

  return result;
}

function generateRandomPassword(length, email) {
  let result = '';

  result += email.charAt(generateRandomInt(email.length));
  result += digits.charAt(generateRandomInt(digits.length));
  result += letters.charAt(generateRandomInt(letters.length)).toUpperCase();
  result += generateRandomString(length - result.length);

  return result;
}

function selectRandomSuffix() {
  cy.get('.dropdown__list-item').then($elements => {
    cy.wrap($elements.eq(generateRandomInt($elements.length))).click({ force: true });
  });
}
