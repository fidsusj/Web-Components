import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-item';

export class FinanceList extends LitElement {

    render() {
        return html`
            ${this.transactions.slice(0,this.restriction).filter((element) => {
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
                              evt.target.seletced? evt.target.setAttribute("selected", "selected") :
                                                   evt.target.removeAttribute("selected");
                          }
                      }}">
                      <span>${element.description}</span>
                      <span class="${element.type === 1 ? "profit" : "loss"}">${element.price + "$"}</span>
                    </vaadin-item>
                `;
            })}
        `;
    }

    static get styles() {
        return css`
            vaadin-item[selected] {
                background: rgb(142, 185, 255);
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
            supportedCategories: {type: Object}
        };
    }

    filterPriceRange(price) {
        switch(this.filter.priceRange.operator){
            case "EQ": return price === this.filter.priceRange.firstValue;
            case "GT": return price >= this.filter.priceRange.firstValue;
            case "LT": return price <= this.filter.priceRange.firstValue;
            case "BT": return price >= this.filter.priceRange.firstValue && price <= this.filter.priceRange.secondValue;
        }
    }

    constructor(){
        super();
        this.supportedCategories = {
            JOB: 0,
            FOOD: 1,
            FAMILY: 2,
            CAR: 3,
            LIFESTYLE: 3
        };
        this.transactions = [{
            type: 1,
            description: "Salary",
            price: 6000,
            category: 0
        }];
        this.filter = {categories: [this.supportedCategories.LIFESTYLE, this.supportedCategories.JOB],
                       priceRange: {operator: "GT",
                                    firstValue: 20
                       }
        };
        this.selectable = true;
    }

}
customElements.define("finance-list", FinanceList);