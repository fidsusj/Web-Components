import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';

export class StockPanel extends LitElement {

    render() {
        return html`
            <link rel="stylesheet" type="text/css" href="/stock-panel/stock-panel.css" />
            
            <div class="container">
                <div class="component">
                    <vaadin-text-field
                      id="company"
                      value="SAP"
                      @change="${(evt) => this.company = evt.target.value}">
                    </vaadin-text-field>
                </div>
            </div>
            <div class="container">
                <div class="left">
                    <div class="component">
                        <span id="development" style="${this.color}">${this.development}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="component">
                        <span id="price">${this.price}</span>
                    </div>
                </div>
            </div>        
    `;
    }

    static get properties() {
        return {
            company: {type: String, reflect: true},
            development: {type: String, attribute: false},
            price: {type: String, attribute: false},
            color: {type: String, attribute: false}
        };
    }

    attributeChangedCallback(name, oldValue, newValue){
        fetch(`https://api.iextrading.com/1.0/stock/${newValue}/chart`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if(json[json.length - 1].changePercent > 0){
                    this.development = html`<i class='up'> </i>${json[json.length - 1].changePercent}%`;
                    this.color = "color: green";
                }
                else {
                    this.development = html`<i class='down'> </i>${json[json.length - 1].changePercent}%`;
                    this.color = "color: red";
                }
                this.price =  html`${json[json.length - 1].high}$`;
            });
    }

}
customElements.define("stock-panel", StockPanel);