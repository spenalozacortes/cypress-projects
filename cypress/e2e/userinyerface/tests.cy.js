/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import Utils from '../../support/utils';
import { userinyerface } from '../../support/locators';
import { assertions } from './assertionData';

describe('test suite', () => {
  beforeEach(() => {
    cy.visit(urls.userinyerface);
  });

  it('help form test', () => {
    cy.get(userinyerface.startButton).should('be.visible');
    cy.get(userinyerface.startLink).click();
    cy.get(userinyerface.game).should('be.visible');
    cy.get(userinyerface.helpButton).click();
    cy.get(userinyerface.helpResponse).should('be.visible');
  });

  it('timer test', () => {
    cy.get(userinyerface.startButton).should('be.visible');
    cy.get(userinyerface.startLink).click();
    cy.get(userinyerface.game).should('be.visible');
    cy.get(userinyerface.timer).should('have.text', assertions.timer);
  });

  it('valid password test', () => {
    cy.get(userinyerface.startButton).should('be.visible');
    cy.get(userinyerface.startLink).click();
    cy.get(userinyerface.game).should('be.visible');
    let randomEmail = Utils.generateRandomString(5);
    let randomDomain = Utils.generateRandomString(5);
    cy.get(userinyerface.emailField).clear().type(randomEmail);
    cy.get(userinyerface.domainField).clear().type(randomDomain);
    cy.selectRandomSuffix();
    let randomPassword = Utils.generateRandomPassword(10, randomEmail);
    cy.get(userinyerface.passwordField).clear().type(randomPassword);
    cy.get(userinyerface.conditionsCheckbox).click();
    cy.contains(userinyerface.nextLink).click();
    cy.get(userinyerface.pageIndicator).should('have.text', assertions.secondPageIndicator);
  });

  it('invalid password test', () => {
    cy.get(userinyerface.startButton).should('be.visible');
    cy.get(userinyerface.startLink).click();
    cy.get(userinyerface.game).should('be.visible');
    let randomEmail = Utils.generateRandomString(5);
    let randomDomain = Utils.generateRandomString(5);
    cy.get(userinyerface.emailField).clear().type(randomEmail);
    cy.get(userinyerface.domainField).clear().type(randomDomain);
    cy.selectRandomSuffix();
    let invalidRandomPassword = Utils.generateRandomString(5);
    cy.get(userinyerface.passwordField).clear().type(invalidRandomPassword);
    cy.get(userinyerface.conditionsCheckbox).click();
    cy.contains(userinyerface.nextLink).click();
    cy.get(userinyerface.pageIndicator).should('not.have.text', assertions.secondPageIndicator);
  });
});
