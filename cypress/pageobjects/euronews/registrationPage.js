/// <reference types="Cypress" />
import { euronews } from "../../support/locators";

class RegistrationPage {
    get emailField() {
        return cy.get(euronews.emailField);
    }

    get passwordField() {
        return cy.get(euronews.passwordField);
    }

    get createAccountButton() {
        return cy.get(euronews.createAccountButton);
    }

    get confirmationMessage() {
        return cy.contains(euronews.confirmationMessage);
    }
}

export default RegistrationPage;
