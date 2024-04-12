/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import newsletters from '../../fixtures/newsletters.json';
import testdata from '../../fixtures/testdata.json';
import utils from '../../support/utils';
import { euronews } from '../../support/locators';
import { assertions } from './assertionData';
import { mainPage } from '../../pageobjects/euronews/mainPage';
import { topicPage } from '../../pageobjects/euronews/topicPage';
import { programsPage } from '../../pageobjects/euronews/programsPage';
import { newslettersPage } from '../../pageobjects/euronews/newslettersPage';
import { registrationPage } from '../../pageobjects/euronews/registrationPage';

describe('Euronews tests', () => {
    beforeEach(() => {
        // Step 1
        // Follow the euronews.com 
        cy.visit(urls.euronews);
    });

    it('test case 1', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', assertions.baseUrl);
        mainPage.agreeCookiesButton.click();
        // Top tags are displayed
        mainPage.topTags.should('be.visible');
        // Views displayed 
        mainPage.views.should('be.visible');
        // Step 2
        // Open one of Views 
        mainPage.viewTitles.eq(testdata.view).click().invoke('text').then(homeTitle => {
            // View is opened and has the correct title (corresponds to the title on the home page) 
            mainPage.viewTitle.should('contain.text', homeTitle.trim());
        }); 
        // Step 3
        // Click on “Programmes”
        mainPage.programsButton.click();
        // All mandatory programs are on the list: My europe, Sport, World, Next, Travel, Green, Culture, Special coverage, Partner content
        mainPage.programTitles.then($titles => {
            const titlesStrings = [...$titles].map(el => el.innerText);
            expect(titlesStrings).to.include.members(testdata.programs);
        });
        // All programs have at least 1 topic
        mainPage.programTitles.each($title => {
            cy.wrap($title).next(euronews.topicLinks).should('exist');
        });
        // Step 4
        // Click on any topic in “My Europe”
        mainPage.topic.click();
        // My Europe page is opened
        cy.url().should('contain', assertions.myEuropeUrl);
        // Each news item is labeled according to the selected topic
        topicPage.labels.each($label => {
            cy.wrap($label).should('contain.text', testdata.topic);
        });
        // Step 5
        // Click “Programmes” -> “All Programmes”
        topicPage.programsDropdown.click();
        topicPage.programsLink.click();
        // More than 30 programs are displayed
        programsPage.programs.should('have.length.above', testdata.minPrograms);
    });

    it('test case 2', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', assertions.baseUrl);
        mainPage.agreeCookiesButton.click();
        // Top tags are displayed
        mainPage.topTags.should('be.visible');
        // Step 2
        // Follow the link "Newsletters" in the header 
        mainPage.newslettersLink.click();
        // Page "Newsletters" is opened 
        cy.url().should('contain', assertions.newslettersUrl);
        // Step 3
        // Check if following newsletters and their data are present on the page
        // All mentioned newsletters are present on the page and their data is matching 
        newsletters.forEach(newsletter => {
            newslettersPage.newsletters.contains(newsletter.name).should('be.visible');
            newslettersPage.newsletters.each(($el, index, $list) => {
                const name = $el.text();
                if (name.includes(newsletter.name)) {
                    expect($el.find(euronews.frequency).text()).to.contain(newsletter.frequency);
                    expect($el.find(euronews.description).text()).to.contain(newsletter.description);
                }
            });
        });
        // Step 4 
        // Click "Select this newsletter" on any newsletter
        cy.selectNewsletter(testdata.newsletterNames[testdata.firstNewsletter]);
        // Create account pop-up is pinned. 
        newslettersPage.createAccountPopup.should('have.class', assertions.popupClass);
        // Step 5
        // Click “Chosen”
        newslettersPage.newsletters.each(($el, index, $list) => {
            if ($el.find(euronews.newsletterText).text().includes(testdata.newsletterNames[testdata.firstNewsletter])) {
                cy.wrap($el.find(euronews.chosenButton)).click();
            }
        });
        // Create account pop-up has unpinned
        newslettersPage.createAccountPopup.should('not.have.class', assertions.popupClass);
        // Step 6
        // Repeat step 4 
        cy.selectNewsletter(testdata.newsletterNames[testdata.secondNewsletter]);
        // Create account pop-up is pinned. 
        newslettersPage.createAccountPopup.should('have.class', assertions.popupClass);
        // Step 7
        // Type random email in create account pop-up. Click “Continue” 
        const randomEmail = utils.generateRandomString(testdata.emailLength) + testdata.domain;
        newslettersPage.emailField.type(randomEmail);
        newslettersPage.continueButton.click();
        // Complete registration page is opened
        cy.url().should('contain', assertions.registerUrl);
        // The email field is automatically filled with the correct email
        registrationPage.emailField.should('have.text', randomEmail);
        // Step 8
        // Enter random password and click “Create my account”
        const randomPassword = utils.generateRandomString(testdata.passwordLength);
        registrationPage.passwordField.type(randomPassword);
        registrationPage.createAccountButton.click();
        // Thank you message is displayed
        registrationPage.confirmationMessage.should('be.visible');
    });
});
