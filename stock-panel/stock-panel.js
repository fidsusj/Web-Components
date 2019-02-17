import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';

export class StockPanel extends LitElement {

    render() {
        return html`

            <link rel="stylesheet" type="text/css" href="/stock-panel/stock-panel.css" />
            
            <div class="top-level">
                <div class="component">
                    <vaadin-text-field
                      id="company"
                      value="SAP"
                      @change="${this.setCompany}">
                    </vaadin-text-field>
                </div>
            </div>
            <div class="top-level">
                <div class="left">
                    <div class="component">
                        <span id="development"></span>
                    </div>
                </div>
                <div class="right">
                    <div class="component">
                        <span id="price"></span>
                    </div>
                </div>
            </div>        
    `;
    }

    constructor() {
        super();
        this.component = this.shadowRoot;
    }

    static get properties() {
        return {
            company: {
                type: String,
                attrName: "company",
                value: "sap"
            },
        };
    }

    static get name(){
        return 'stock-panel';
    }

    get company(){
        return this.getAttribute('company');
    }

    set company(val){
        this.setAttribute('company', val);
    }

    setCompany(e){
        this.company = e.target.value;
    }

    firstUpdated(changedProperties) {

    }

    connectedCallback(){
        super.connectedCallback();
    }

    disconnectedCallback(){
        super.disconnectedCallback();
    }

    attributeChangedCallback(name, oldValue, newValue){
        fetch(`https://api.iextrading.com/1.0/stock/${newValue}/chart`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                let development = this.component.querySelector('#development');
                if(json[json.length - 1].changePercent > 0){
                    development.innerHTML = "<i class='up'> </i>" + json[json.length - 1].changePercent + "%";
                    development.style.color = "green";
                }
                else {
                    development.innerHTML = "<i class='down'></i>" + json[json.length - 1].changePercent + "%";
                    development.style.color = "red";
                }

                let price = this.component.querySelector('#price');
                price.textContent = json[json.length - 1].high + "$";
            });
    }

}
customElements.define(StockPanel.name, StockPanel);