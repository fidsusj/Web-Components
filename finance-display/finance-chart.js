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
        let chartData = this.data.map((value) => {return [value.category, value.amount];}).reverse();
        chartData.push([this.labelX, this.labelY]);
        return html`
                <google-chart data=${JSON.stringify(chartData.reverse())}> </google-chart>
        `;
    }

    static get properties() {
        return {
            labelX: {type: String, reflect: true},
            labelY: {type: String, reflect: true},
            data: {type: Array}
        };
    }

    constructor() {
        super();
        this.labelX = "x-axis";
        this.labelY = "y-axis";
        this.data = [];
    }

}
customElements.define("finance-chart", FinanceChart);