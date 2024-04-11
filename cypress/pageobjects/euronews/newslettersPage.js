/// <reference types="Cypress" />
import { euronews } from "../../support/locators";

class NewslettersPage {
    get newsletters() {
        return cy.get(euronews.newsletters);
    }

    get createAccountPopup() {
        return cy.get(euronews.createAccountPopup);
    }

    get emailField() {
        return cy.get(euronews.emailFieldPopup);
    }

    get continueButton() {
        return cy.get(euronews.continueButton);
    }
}

export default NewslettersPage;
