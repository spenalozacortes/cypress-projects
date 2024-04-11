/// <reference types="Cypress" />

import { userinyerface } from "../../support/locators";

class GamePage {
    get game() {
        return cy.get(userinyerface.game);
    }

    get helpButton() {
        return cy.get(userinyerface.helpButton);
    }

    get helpResponse() {
        return cy.get(userinyerface.helpResponse);
    }

    get timer() {
        return cy.get(userinyerface.timer);
    }

    get emailField() {
        return cy.get(userinyerface.emailField);
    }

    get domainField() {
        return cy.get(userinyerface.domainField);
    }

    get suffixDropdown() {
        return cy.get(userinyerface.suffixDropdown);
    }

    get suffixes() {
        return cy.get(userinyerface.suffixes);
    }

    get passwordField() {
        return cy.get(userinyerface.passwordField);
    }

    get conditionsCheckbox() {
        return cy.get(userinyerface.conditionsCheckbox);
    }

    get nextLink() {
        return cy.contains(userinyerface.nextLink);
    }

    get pageIndicator() {
        return cy.get(userinyerface.pageIndicator);
    }
}

export default GamePage;
