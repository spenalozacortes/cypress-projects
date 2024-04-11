/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import utils from '../../support/utils';
import { assertions } from './assertionData';
import MainPage from '../../pageobjects/userinyerface/mainPage';
import GamePage from '../../pageobjects/userinyerface/gamePage';

describe('test suite', () => {
  beforeEach(() => {
    // Step 1
    // Navigate to main page by URL
    cy.visit(urls.userinyerface);
  });

  it('help form test', () => {
    // Main page is open
    const mainPage = new MainPage();
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    const gamePage = new GamePage();  
    gamePage.game.should('be.visible');
    // Click help button on the help form
    gamePage.helpButton.click();
    // Help response is displayed
    gamePage.helpResponse.should('be.visible');
  });

  it('timer test', () => {
    // Main page is open
    const mainPage = new MainPage();
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    const gamePage = new GamePage();
    gamePage.game.should('be.visible');
    // The timer starts from zero
    gamePage.timer.should('have.text', assertions.timer);
  });

  it('valid password test', () => {
    // Main page is open
    const mainPage = new MainPage();
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    const gamePage = new GamePage();
    gamePage.game.should('be.visible');
    // Input random valid email, valid random password and accept terms and conditions
    let randomEmail = utils.generateRandomString(10);
    let randomDomain = utils.generateRandomString(5);
    gamePage.emailField.clear().type(randomEmail);
    gamePage.domainField.clear().type(randomDomain);
    cy.selectRandomSuffix();
    let randomPassword = utils.generateRandomPassword(10, randomEmail);
    gamePage.passwordField.clear().type(randomPassword);
    gamePage.conditionsCheckbox.click();
    // Click button to navigate to the next card
    gamePage.nextLink.click();
    // The second card is open
    gamePage.pageIndicator.should('have.text', assertions.secondPageIndicator);
  });

  it('invalid password test', () => {
    // Main page is open
    const mainPage = new MainPage();
    mainPage.startButton.should('be.visible');
    // Click Here link
    mainPage.startLink.click();
    // Game page is open
    const gamePage = new GamePage();
    gamePage.game.should('be.visible');
    // Input random valid email, invalid random password and accept terms and conditions
    let randomEmail = utils.generateRandomString(10);
    let randomDomain = utils.generateRandomString(5);
    gamePage.emailField.clear().type(randomEmail);
    gamePage.domainField.clear().type(randomDomain);
    cy.selectRandomSuffix();
    let invalidRandomPassword = utils.generateRandomString(5);
    gamePage.passwordField.clear().type(invalidRandomPassword);
    gamePage.conditionsCheckbox.click();
    // Click button to navigate to the next card
    gamePage.nextLink.click();
    // The second card isn't open
    gamePage.pageIndicator.should('not.have.text', assertions.secondPageIndicator);
  });
});
