import { LitElement, html } from 'lit-element';
import '@google-web-components/google-chart/google-chart.js';

//      rect[fill="#ffffff"] {
//         fill: transparent;
//       }
//
//       rect[fill="#3366cc"] {
//         fill: var(--lumo-primary-color);
//       }

export class FinanceChart extends LitElement {

    render() {
        let chartData = this.data.values.map((value) => {return [value.category, value.amount];}).reverse();
        chartData.push([this.data.labelX, this.data.labelY]);
        return html`
                <google-chart data=${JSON.stringify(chartData.reverse())}> 
                </google-chart>
        `;
    }

    static get properties() {
        return {
            data: {type: Object}
        };
    }

    constructor() {
        super();
        this.data = {
            labelX: "categories",
            labelY: "Spent money",
            values: [
                {category: "car", amount: 12},
                {category: "wife", amount: 14}
            ]
        };
    }

}
customElements.define("finance-chart", FinanceChart);