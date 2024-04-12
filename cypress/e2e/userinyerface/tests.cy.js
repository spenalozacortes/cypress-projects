/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import testdata from '../../fixtures/testdata.json';
import utils from '../../support/utils';
import { assertions } from './assertionData';
import { mainPage } from '../../pageobjects/userinyerface/mainPage';
import { gamePage } from '../../pageobjects/userinyerface/gamePage';

describe('test suite', () => {
  beforeEach(() => {
    // Step 1
    // Navigate to main page by URL
    cy.visit(urls.userinyerface);
  });

  it('help form test', () => {
    // Main page is open
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open  
    gamePage.game.should('be.visible');
    // Click help button on the help form
    gamePage.helpButton.click();
    // Help response is displayed
    gamePage.helpResponse.should('be.visible');
  });

  it('timer test', () => {
    // Main page is open
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    gamePage.game.should('be.visible');
    // The timer starts from zero
    gamePage.timer.should('have.text', assertions.timer);
  });

  it('valid password test', () => {
    // Main page is open
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    gamePage.game.should('be.visible');
    // Input random valid email, valid random password and accept terms and conditions
    const randomEmail = utils.generateRandomString(testdata.emailLength);
    const randomDomain = utils.generateRandomString(testdata.domainLength);
    gamePage.emailField.clear().type(randomEmail);
    gamePage.domainField.clear().type(randomDomain);
    cy.selectRandomSuffix();
    const randomPassword = utils.generateRandomPassword(testdata.passwordLength, randomEmail);
    gamePage.passwordField.clear().type(randomPassword);
    gamePage.conditionsCheckbox.click();
    // Click button to navigate to the next card
    gamePage.nextLink.click();
    // The second card is open
    gamePage.pageIndicator.should('have.text', assertions.secondPageIndicator);
  });

  it('invalid password test', () => {
    // Main page is open
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    gamePage.game.should('be.visible');
    // Input random valid email, invalid random password and accept terms and conditions
    const randomEmail = utils.generateRandomString(testdata.emailLength);
    const randomDomain = utils.generateRandomString(testdata.domainLength);
    gamePage.emailField.clear().type(randomEmail);
    gamePage.domainField.clear().type(randomDomain);
    cy.selectRandomSuffix();
    const invalidRandomPassword = utils.generateRandomString(testdata.passwordLength);
    gamePage.passwordField.clear().type(invalidRandomPassword);
    gamePage.conditionsCheckbox.click();
    // Click button to navigate to the next card
    gamePage.nextLink.click();
    // The second card isn't open
    gamePage.pageIndicator.should('not.have.text', assertions.secondPageIndicator);
  });
});
