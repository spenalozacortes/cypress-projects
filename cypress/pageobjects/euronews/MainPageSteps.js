/// <reference types="Cypress" />
import { assertions } from "../../e2e/euronews/assertionData";
import { mainPage } from "./mainPage";

class MainPageSteps {

    visitPage() {
        cy.url().should('eq', assertions.baseUrl);
        mainPage.agreeCookiesButton.click();
    }
}

export const mainPageSteps = new MainPageSteps();
