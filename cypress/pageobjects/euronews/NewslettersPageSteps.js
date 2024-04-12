/// <reference types="Cypress" />
import { newslettersPage } from "./NewslettersPage";
import newsletters from '../../fixtures/newsletters.json';
import { euronews } from "../../support/locators";

class NewslettersPageSteps {
    
    checkNewslettersData() {
        newsletters.forEach(newsletter => {
            newslettersPage.newsletters.contains(newsletter.name).should('be.visible');
            newslettersPage.newsletters.each(($el, index, $list) => {
                const name = $el.text();
                if (name.includes(newsletter.name)) {
                    expect($el.find(euronews.frequency).text()).to.contain(newsletter.frequency);
                    expect($el.find(euronews.description).text()).to.contain(newsletter.description);
                }
            });
        });
    }
}

export const newslettersPageSteps = new NewslettersPageSteps();
