/// <reference types="Cypress" />

import { userinyerface } from "../../support/locators";

class MainPage {

    get startButton() {
        return cy.get(userinyerface.startButton);
    }

    get startLink() {
        return cy.get(userinyerface.startLink);
    }
}

export default MainPage;
