import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import './finance-chart'
import './finance-list'
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-item/vaadin-item';

export class FinanceDisplay extends LitElement {

    render() {
        let data = [];
        let sum = new Map();
        if(this.transactions.length === 0){
            data.push({amount: 0, category: ""});
        } else {
            for(let element of this.transactions){
                if(!sum.get(element.category)){
                    sum.set(element.category, element.price)
                } else {
                    sum.set(element.category, sum.get(element.category) + element.price);
                }
            }
            for (let [category, amount] of sum) {
                data.push({category: category, amount: amount});
            }
        }

        return html`
            <div class="grid">
                <div class="one-one">
                    <finance-chart labelX="categories" labelY="Spent money" data="${JSON.stringify(data)}"></finance-chart>
                </div>
                <div class="one-two">
                    <vaadin-text-field id="description" label="Description"></vaadin-text-field>
                    <vaadin-number-field id="price" label="Price in €" step="0.01" has-controls></vaadin-number-field>
                    <br />
                     <vaadin-radio-group id="category" label="Category">
                        ${repeat(this.supportedCategories, (element) => element, (element) => html`
                            <vaadin-radio-button>${element}</vaadin-radio-button>
                        `)}
                    </vaadin-radio-group>
                    <br />
                    <vaadin-button theme="success primary" @click="${this.handleTransactionInput}">Save</vaadin-button>
                    <vaadin-button theme="error primary" @click="${() => { this.transactions = [];}}">Delete All</vaadin-button>
                </div>
                <div class="two-one">
                    <vaadin-item><strong>Filter bar:</strong></vaadin-item>
                    <finance-list 
                        transactions="${JSON.stringify(this.transactions)}" 
                        filter="${JSON.stringify(this.filter)}" 
                        restriction=1
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
            .two-one { grid-row: 2; grid-column-start: 1; grid-column-end: 11; }
        `;
    }

    static get properties() {
        return {
            transactions: {type: Array},
            supportedCategories: {type: Array},
            filter: {type: Object}
        }
    }

    constructor() {
        super();
        this.transactions = [];
        this.supportedCategories = ["Job", "Food", "Family", "Car", "Lifestyle"];
        this.filter = {
            categories: this.supportedCategories,
            priceRange: {operator: "BT",
                firstValue: -99,
                secondValue: 99
            }
        };

    }

    handleTransactionInput() {
        let description = this.shadowRoot.getElementById('description');
        let price = this.shadowRoot.getElementById('price');
        let categories = Array.from(this.shadowRoot.getElementById('category').children);
        let category = "";
        for(let element of categories) {
            if(element.checked)
                category = element;
            element.checked = false;
        }
        let transaction = {
            description: description.value,
            price: Number(price.value),
            positive: price.value >= 0,
            category: category.innerText || "uncategorized"
        };
        this.transactions = [...this.transactions, transaction];
        description.value = "";
        price.value = "";
    }

}
customElements.define("finance-display", FinanceDisplay);