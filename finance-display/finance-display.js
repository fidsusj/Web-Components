import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import './finance-chart'
import './finance-list'

export class FinanceDisplay extends LitElement {

    render() {
        return html`
            <div class="grid">
                <div class="one-one">
                    <finance-chart></finance-chart>
                </div>
                <div class="one-two">
                    <vaadin-text-field label="Description"></vaadin-text-field>
                    <vaadin-number-field label="Price in €" step="0.01" has-controls></vaadin-number-field>
                    <br />
                     <vaadin-radio-group label="Category">
                        ${repeat(this.supportedCategories, (element) => element, (element) => html`
                            <vaadin-radio-button>${element}</vaadin-radio-button>
                        `)}
                    </vaadin-radio-group>
                    <br />
                    <vaadin-button theme="success primary">Save</vaadin-button>
                </div>
                <div class="two-one">
                    <finance-list 
                        transactions="${JSON.stringify(this.transactions)}" 
                        filter="${JSON.stringify(this.filter)}" 
                        restriction="all"
                        selectable>
                    </finance-list>
                </div>
            </div>
        `;
    }

    static get styles() {
        return css`
            .grid {display: grid; height: 100%; }
            .one-one { grid-row: 1; grid-column-start: 1; grid-column-end: 11; }
            .one-two { grid-row: 1; grid-column: 11; }
            .two-one { grid-row: 2; grid-column-start: 1; grid-column-end: 12; }
        `;
    }

    static get properties() {
        return {
            transactions: {type: Array},
            supportedCategories: {type: Array}
        }
    }

    constructor() {
        super();
        this.transactions = [{
            type: 1,
            description: "Salary",
            price: 6000,
            category: "Job"
        },
        {
            type: -1,
            description: "Shopping",
            price: 70,
            category: "Lifestyle"
        },
        {
            type: -1,
            description: "Meeting friends",
            price: 30,
            category: "Lifestyle"
        }];
        this.supportedCategories = ["Job", "Food", "Family", "Car", "Lifestyle"];
        this.filter = {categories: this.supportedCategories,
            priceRange: {operator: "BT",
                firstValue: 20,
                secondValue: 70
            }
        };

    }

}
customElements.define("finance-display", FinanceDisplay);