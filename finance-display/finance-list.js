import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-item/vaadin-item';

export class FinanceList extends LitElement {

    render() {
        return html`
            ${this.transactions.reverse().slice(0,this.restriction).filter((element) => {
                return (!this.filter.types || this.filter.types.includes(element.type)) && 
                       (!this.filter.descriptions || this.filter.descriptions.includes(element.description)) &&
                       (!this.filter.categories || this.filter.categories.includes(element.category)) &&
                       (!this.filter.priceRange || this.filterPriceRange(element.price))
            }).map((element) => {
                return html`               
                    <vaadin-item id="selectable" tabindex="0"
                      @click="${ (evt) => {
                          if(this.selectable){
                              evt.target.seletced = !evt.target.seletced;
                              evt.target.seletced ? evt.target.setAttribute("selected", "selected") :
                                                    evt.target.removeAttribute("selected");
                              this.dispatchEvent(new CustomEvent('item-clicked', {
                                  detail: {
                                      description: evt.target.innerText.split("\n")[0],
                                      selected: evt.target.seletced
                                  },
                                  bubbles: true,
                                  composed: true }));
                          }
                      }}">
                      <span>${element.description}</span>
                      <span class="${element.type}">${element.price + "$"}</span>
                    </vaadin-item>
                `;
            })}
        `;
    }

    static get styles() {
        return css`
            vaadin-item[selected] {
                background: var(--lumo-contrast-10pct);
            }
            
            .profit {
                color: green;
                float: right;
            }
            
            .loss {
                color: red;
                float: right;
            }
        `;
    }

    static get properties() {
        return {
            transactions: {type: Array},
            filter: {type: Object},
            selectable: {type: Boolean},
            restriction: {type: Number,
                          converter: (value, type) => {
                                if(value === "all"){
                                    return Number.MAX_VALUE;
                                } else {
                                    return type(value);
                                }
                          }},
        };
    }

    constructor(){
        super();
        this.transactions = [];
        this.filter = {};
        this.selectable = false;
        this.restriction = "all";
    }

    filterPriceRange(price) {
        switch(this.filter.priceRange.operator){
            case "EQ": return price === this.filter.priceRange.firstValue;
            case "GT": return price >= this.filter.priceRange.firstValue;
            case "LT": return price <= this.filter.priceRange.firstValue;
            case "BT": return price >= this.filter.priceRange.firstValue && price <= this.filter.priceRange.secondValue;
            default: return true;
        }
    }
}
customElements.define("finance-list", FinanceList);