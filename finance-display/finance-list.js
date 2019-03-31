import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-item/vaadin-item';
import {styleMap} from "lit-html/directives/style-map";

export class FinanceList extends LitElement {

    render() {
        return html`
            ${this.transactions.sort((obj, obj2) => {
                return obj.price < obj2.price ? 1 : -1;
            }).slice(0,this.restriction).map((element) => {
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
                      <span style="${styleMap(this.buildStyle(element))}">${element.price + "$"}</span>
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
        `;
    }

    static get properties() {
        return {
            transactions: {type: Array},
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
        this.selectable = false;
        this.restriction = "all";
    }

    buildStyle(element) {
        let style = {float: 'right'};
        element.type === "profit" ? style.color = 'green' : style.color = 'red';
        return style;
    }

}
customElements.define("finance-list", FinanceList);