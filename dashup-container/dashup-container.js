import { LitElement, html } from '@polymer/lit-element';
import 'jquery'
import 'jquery-ui'
import 'lodash'
import 'gridstack'

// run npm i --save <name>

class DashupContainer extends LitElement {

    render() {
        return html`
            <p>${this.rows},${this.cols},${this.pos}</p>
            <div class="grid-stack">
                <div class="grid-stack-item"
                     data-gs-x="0" data-gs-y="0"
                     data-gs-width="4" data-gs-height="2">
                    <div class="grid-stack-item-content">
                         
                    </div>
                </div>
                <div class="grid-stack-item"
                    data-gs-x="4" data-gs-y="0"
                    data-gs-width="4" data-gs-height="4">
                   <div class="grid-stack-item-content">
                   
                   </div>
                </div>
            </div>
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
                attrName: "rows"
            },
            cols: {
                type: Number,
                attrName: "cols"
            },
            pos: {
                type: Number,
                attrName: "pos"
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

    renderCallback(){
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };
        $('.grid-stack').gridstack(options);
    }

    attributeChanged(name, oldValue, newValue) {

    }

}
customElements.define(DashupContainer.name, DashupContainer);