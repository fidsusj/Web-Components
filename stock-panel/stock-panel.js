import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import {styleMap} from "lit-html/directives/style-map";

export class StockPanel extends LitElement {

    render() {
        return html`
            <link rel="stylesheet" type="text/css" href="/stock-panel/stock-panel.css" />
            
            <div class="container">
                <div class="component">
                    <vaadin-text-field
                      id="company"
                      value="SAP"
                      @change="${(evt) => this.handleStockUpdate(evt.target.value)}">
                    </vaadin-text-field>
                </div>
            </div>
            <div class="container">
                <div class="left">
                    <div class="component">
                        <span id="development" style="${styleMap(this.getSettings().style)}">
                            <i class=${this.getSettings().icon}></i>${this.development}%
                        </span>
                    </div>
                </div>
                <div class="right">
                    <div class="component">
                        <span id="price">${this.price}$</span>
                    </div>
                </div>
            </div>        
    `;
    }

    static get properties() {
        return {
            company: {type: String, reflect: true},
            development: {type: String, attribute: false},
            price: {type: String, attribute: false}
        };
    }

    constructor() {
        super();
        this.company = "SAP";
        this.handleStockUpdate(this.company);
    }

    handleStockUpdate(company){
        fetch(`https://api.iextrading.com/1.0/stock/${company}/chart`).then((response) => {
            return response.json();
        }).then((json) => {
                this.development = json[json.length - 1].changePercent;
                this.price =  json[json.length - 1].high;
        });
    }

    getSettings() {
        if(this.development > 0) {
            return {
                icon: 'up',
                style: {color: 'green'}
            }
        } else {
            return {
                icon: 'down',
                style: {color: 'red'}
            }
        }
    }

}
customElements.define("stock-panel", StockPanel);