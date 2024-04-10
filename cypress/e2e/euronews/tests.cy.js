/// <reference types="Cypress" />
import urls from '../../fixtures/urls.json';
import newsletters from '../../fixtures/newsletters.json';
import testdata from '../../fixtures/testdata.json';
import Utils from '../../support/utils';

describe('Euronews tests', () => {
    beforeEach(() => {
        // Step 1
        // Follow the euronews.com 
        cy.visit(urls.euronews);
    });

    xit('test case 1', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', 'https://www.euronews.com/');
        cy.get('#didomi-notice-agree-button').click();
        // Top tags are displayed
        cy.get('[class*="tag-list"]').should('be.visible');
        // Views displayed 
        cy.get('.b-topstories-home').should('be.visible');
        // Step 2
        // Open one of Views 
        cy.get('.b-topstories-home__aside__article h2 a').eq(0).click().invoke('text').then(homeTitle => {
            // View is opened and has the correct title (corresponds to the title on the home page) 
            cy.get('.jsArticleFirst.swiper-slide-active h1').should('contain.text', homeTitle.trim());
        });
        // Step 3
        // Click on “Programmes”
        cy.get('.c-programs-icon').click();
        // All mandatory programs are on the list: My europe, Sport, World, Next, Travel, Green, Culture, Special coverage, Partner content
        cy.get('.c-programs-menu__categories .title').as('titles');
        cy.get('@titles').then($titles => {
            const titlesStrings = [...$titles].map(el => el.innerText);
            expect(titlesStrings).to.include.members(testdata.programs);
        });
        // All programs have at least 1 topic
        cy.get('@titles').each($title => {
            cy.wrap($title).next('.list-item__link').should('exist');
        });
        // Step 4
        // Click on any topic in “My Europe”
        let topic = 'Europe Decoded';
        cy.contains(topic).click();
        // My Europe page is opened
        cy.url().should('contain', 'my-europe');
        // Each news item is labeled according to the selected topic
        cy.get('.program-name').each($label => {
            cy.wrap($label).should('contain.text', topic);
        });
        // Step 5
        // Click “Programmes” -> “All Programmes”
        cy.contains('All Programmes').click({ force: true });
        // More than 30 programs are displayed
        cy.get('.c-program-card').should('have.length.above', 30);
    });

    it('test case 2', () => {
        // Main page of Euronews is opened 
        cy.url().should('eq', 'https://www.euronews.com/');
        cy.get('#didomi-notice-agree-button').click();
        // Top tags are displayed
        cy.get('[class*="tag-list"]').should('be.visible');
        // Step 2
        // Follow the link "Newsletters" in the header 
        cy.contains('Newsletters').click();
        // Page "Newsletters" is opened 
        cy.url().should('contain', 'newsletters');
        // Step 3
        // Check if following newsletters and their data are present on the page
        // All mentioned newsletters are present on the page and their data is matching 
        newsletters.forEach(newsletter => {
            cy.get('.p-8').contains(newsletter.name).should('be.visible');
            cy.get('.p-8').each(($el, index, $list) => {
                const name = $el.text();
                if (name.includes(newsletter.name)) {
                    expect($el.find('.mt-2').text()).to.contain(newsletter.frequency);
                    expect($el.find('.mt-4').text()).to.contain(newsletter.description);
                }
            });
        });
        // Step 4 
        // Click "Select this newsletter" on any newsletter
        cy.selectNewsletter(testdata.newsletters[0]);
        // Create account pop-up is pinned. 
        cy.get('.cta-newsletter-esturgeon').should('have.class', 'sticky');
        // Step 5
        // Click “Chosen”
        cy.get('.p-8').each(($el, index, $list) => {
            if ($el.find('h2').text().includes(testdata.newsletters[0])) {
                cy.wrap($el.find('.btn-tertiary-plain')).click();
            }
        });
        // Create account pop-up has unpinned
        cy.get('.cta-newsletter-esturgeon').should('not.have.class', 'sticky');
        // Step 6
        // Repeat step 4 
        cy.selectNewsletter(testdata.newsletters[1]);
        // Create account pop-up is pinned. 
        cy.get('.cta-newsletter-esturgeon').should('have.class', 'sticky');
        // Step 7
        // Type random email in create account pop-up. Click “Continue” 
        const randomEmail = Utils.generateRandomString(5) + '@gmail.com';
        cy.get('[type="email"]').type(randomEmail);
        cy.get('[value="Continue"]').click();
        // Complete registration page is opened
        cy.url().should('contain', 'register');
        // The email field is automatically filled with the correct email
        cy.get('input[id*="loginID"]').should('have.text', randomEmail);
        // Step 8
        // Enter random password and click “Create my account”
        const randomPassword = Utils.generateRandomString(10);
        cy.get('input[id*="password"]').type(randomPassword);
        cy.get('input[value="Create my account"]').click();
        // Thank you message is displayed
        cy.contains('Thank you, check your emails').should('be.visible');
    });
});
