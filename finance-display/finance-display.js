import { LitElement, html } from 'lit-element';
import './finance-chart';
import {FinanceList} from "./finance-list";

export class FinanceDisplay extends LitElement {

    render() {
        return html`
            <finance-chart transactions="${JSON.stringify(this.transactions)}"></finance-chart>
            <finance-list restriction="all"><finance-list>
        `;
    }

    static get properties() {
        return {
            transactions: {type: Array}
        }
    }

    constructor() {
        super();
        this.transactions = [{
            type: 1,
            description: "Salary",
            price: 6000,
            category: 0
        },
        {
            type: -1,
            description: "Shopping",
            price: 70,
            category: 3
        },
        {
            type: -1,
            description: "Meeting friends",
            price: 30,
            category: 3
        }];
    }

}
customElements.define("finance-display", FinanceDisplay);