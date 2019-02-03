import { LitElement, html } from '@polymer/lit-element';

// run npm i --save <name>
//${this.company}
class StockPanel extends LitElement {

    render() {
        return html`

            <link rel="stylesheet" type="text/css" href="/stock-panel/stock-panel.css" />
            
            <div class="left">
                <div class="component">
                    <input id="company" type="text" value="SAP"/>
                </div>
                <div class="component">
                    <span id="development"></span>
                </div>
            </div>
            <div class="right">
                <span id="price"></span>
            </div>
            
    `;
    }

    constructor() {
        super();
        this.component = this.shadowRoot;
    }

    static get observedAttributes() {
        return ["company"];
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

    firstUpdated(changedProperties) {
        let input = this.component.querySelector('input');
        input.addEventListener('change', () => {
            this.company = input.value;
        });
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