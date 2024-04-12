/// <reference types="Cypress" />
import { euronews } from "../../support/locators";

class MainPage {
    get agreeCookiesButton() {
        return cy.get(euronews.agreeCookiesButton);
    }

    get topTags() {
        return cy.get(euronews.topTags);
    }

    get views() {
        return cy.get(euronews.views);
    }

    get viewTitles() {
        return cy.get(euronews.viewTitles);
    }

    get viewTitle() {
        return cy.get(euronews.viewTitle);
    }

    get programsButton() {
        return cy.get(euronews.programsButton);
    }

    get programTitles() {
        return cy.get(euronews.programsTitles);
    }

    get topic() {
        return cy.contains(euronews.topic);
    }

    get newslettersLink() {
        return cy.contains(euronews.newslettersLink);
    }
}

export const mainPage = new MainPage();
