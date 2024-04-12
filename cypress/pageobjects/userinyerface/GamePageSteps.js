/// <reference types="Cypress" />
import { gamePage } from "./gamePage";

class GamePageSteps {

    login(email, domain, password) {
        gamePage.emailField.clear().type(email);
        gamePage.domainField.clear().type(domain);
        cy.selectRandomSuffix();
        gamePage.passwordField.clear().type(password);
    }
    
}

export const gamePageSteps = new GamePageSteps();
