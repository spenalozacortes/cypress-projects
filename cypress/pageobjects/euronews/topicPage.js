/// <reference types="Cypress" />
import { euronews } from "../../support/locators";

class TopicPage {
    get labels() {
        return cy.get(euronews.labels);
    }

    get programsDropdown() {
        return cy.get(euronews.programsDropdown);
    }

    get programsLink() {
        return cy.contains(euronews.programsLink);
    }
}

export const topicPage = new TopicPage();
