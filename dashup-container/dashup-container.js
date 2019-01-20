import { LitElement, html } from '@polymer/lit-element';

// run npm i --save <name>

class DashupContainer extends LitElement {

    render() {
        return html`

        <p>Attribute: Rows: ${this.rows}, Cols: ${this.cols}, Pos: ${this.pos}</p>

    `;
    }

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["rows", "cols", "pos"];
    }

    static get properties() {
        return {
            rows: {
                type: Number,
                attrName: "rows",
                value: '1'
            },
            cols: {
                type: Number,
                attrName: "cols",
                value: '1'
            },
            pos: {
                type: Number,
                attrName: "pos",
                value: '1'
            }
        };
    }

    static get name(){
        return 'dashup-container';
    }

    get rows(){
        return this.getAttribute('rows');
    }

    set rows(val){
        this.setAttribute('rows', val);
    }

    get cols(){
        return this.getAttribute('cols');
    }

    set cols(val){
        this.setAttribute('cols', val);
    }

    get pos(){
        return this.getAttribute('pos');
    }

    set pos(val){
        this.setAttribute('pos', val);
    }

    connectedCallback(){
        super.connectedCallback();
    }

    disconnectedCallback(){
        super.disconnectedCallback();
    }

    attributeChangedCallback(name, oldValue, newValue){

    }

}
customElements.define(DashupContainer.name, DashupContainer);