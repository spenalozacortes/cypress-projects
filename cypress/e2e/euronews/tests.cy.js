/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import newsletters from '../../fixtures/newsletters.json';
import testdata from '../../fixtures/testdata.json';
import utils from '../../support/utils';
import { euronews } from '../../support/locators';
import { assertions } from './assertionData';

describe('Euronews tests', () => {
    beforeEach(() => {
        // Step 1
        // Follow the euronews.com 
        cy.visit(urls.euronews);
    });

    it('test case 1', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', assertions.baseUrl);
        cy.get(euronews.agreeCookiesButton).click();
        // Top tags are displayed
        cy.get(euronews.topTags).should('be.visible');
        // Views displayed 
        cy.get(euronews.views).should('be.visible');
        // Step 2
        // Open one of Views 
        cy.get(euronews.viewsTitles).eq(0).click().invoke('text').then(homeTitle => {
            // View is opened and has the correct title (corresponds to the title on the home page) 
            cy.get(euronews.viewTitle).should('contain.text', homeTitle.trim());
        }); 
        // Step 3
        // Click on “Programmes”
        cy.get(euronews.programsButton).click();
        // All mandatory programs are on the list: My europe, Sport, World, Next, Travel, Green, Culture, Special coverage, Partner content
        cy.get(euronews.programsTitles).then($titles => {
            const titlesStrings = [...$titles].map(el => el.innerText);
            expect(titlesStrings).to.include.members(testdata.programs);
        });
        // All programs have at least 1 topic
        cy.get(euronews.programsTitles).each($title => {
            cy.wrap($title).next(euronews.topicLinks).should('exist');
        });
        // Step 4
        // Click on any topic in “My Europe”
        cy.contains(euronews.topic).click();
        // My Europe page is opened
        cy.url().should('contain', assertions.myEuropeUrl);
        // Each news item is labeled according to the selected topic
        cy.get(euronews.labels).each($label => {
            cy.wrap($label).should('contain.text', testdata.topic);
        });
        // Step 5
        // Click “Programmes” -> “All Programmes”
        cy.contains(euronews.programsLink).click({ force: true });
        // More than 30 programs are displayed
        cy.get(euronews.programs).should('have.length.above', 30);
    });

    it('test case 2', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', assertions.baseUrl);
        cy.get(euronews.agreeCookiesButton).click();
        // Top tags are displayed
        cy.get(euronews.topTags).should('be.visible');
        // Step 2
        // Follow the link "Newsletters" in the header 
        cy.contains(euronews.newslettersLink).click();
        // Page "Newsletters" is opened 
        cy.url().should('contain', assertions.newslettersUrl);
        // Step 3
        // Check if following newsletters and their data are present on the page
        // All mentioned newsletters are present on the page and their data is matching 
        newsletters.forEach(newsletter => {
            cy.get(euronews.newsletters).contains(newsletter.name).should('be.visible');
            cy.get(euronews.newsletters).each(($el, index, $list) => {
                const name = $el.text();
                if (name.includes(newsletter.name)) {
                    expect($el.find(euronews.frequencyText).text()).to.contain(newsletter.frequency);
                    expect($el.find(euronews.descriptionText).text()).to.contain(newsletter.description);
                }
            });
        });
        // Step 4 
        // Click "Select this newsletter" on any newsletter
        cy.selectNewsletter(testdata.newsletters[0]);
        // Create account pop-up is pinned. 
        cy.get(euronews.createAccountPopup).should('have.class', assertions.popupClass);
        // Step 5
        // Click “Chosen”
        cy.get(euronews.newsletters).each(($el, index, $list) => {
            if ($el.find(euronews.newsletterText).text().includes(testdata.newsletters[0])) {
                cy.wrap($el.find(euronews.chosenButton)).click();
            }
        });
        // Create account pop-up has unpinned
        cy.get(euronews.createAccountPopup).should('not.have.class', assertions.popupClass);
        // Step 6
        // Repeat step 4 
        cy.selectNewsletter(testdata.newsletters[1]);
        // Create account pop-up is pinned. 
        cy.get(euronews.createAccountPopup).should('have.class', assertions.popupClass);
        // Step 7
        // Type random email in create account pop-up. Click “Continue” 
        const randomEmail = utils.generateRandomString(5) + testdata.domain;
        cy.get(euronews.emailFieldPopup).type(randomEmail);
        cy.get(euronews.continueButton).click();
        // Complete registration page is opened
        cy.url().should('contain', assertions.registerUrl);
        // The email field is automatically filled with the correct email
        cy.get(euronews.emailField).should('have.text', randomEmail);
        // Step 8
        // Enter random password and click “Create my account”
        const randomPassword = utils.generateRandomString(10);
        cy.get(euronews.passwordField).type(randomPassword);
        cy.get(euronews.createAccountButton).click();
        // Thank you message is displayed
        cy.contains(euronews.confirmationMessage).should('be.visible');
    });
});
