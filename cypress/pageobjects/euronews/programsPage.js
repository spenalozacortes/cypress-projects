/// <reference types="Cypress" />
import { euronews } from "../../support/locators";

class ProgramsPage {
    get programs() {
        return cy.get(euronews.programs);
    }
}

export default ProgramsPage;
