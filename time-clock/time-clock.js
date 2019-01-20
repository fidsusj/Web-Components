import { LitElement, html } from '@polymer/lit-element';

// run npm i --save <name>

class Clock extends LitElement {

    render() {
        return html`

            <link rel="stylesheet" type="text/css" href="/time-clock/time-clock.css" />
        
            <div class="clock">
                  <div id="hours"></div>
                  <div id="minutes"></div>
                  <div id="seconds"></div>
                  <div class="three"></div>
                  <div class="six"></div>
                  <div class="nine"></div>
                  <div class="twelve"></div>
                  <div class="center"></div>
            </div>
            
            <p>Attribute: Rows: ${this.rows}, Cols: ${this.cols}, Pos: ${this.pos}</p>
              
    `;
    }

    constructor() {
        super();
        var component = this.shadowRoot;

        window.setInterval(function() {
            var oDate = new Date();
            var h = 30 * ((oDate.getHours() % 12) + oDate.getMinutes() / 60); // 30 degrees hour
            var m = 6 * oDate.getMinutes(); // 6 degrees every minute
            var s = 6 * oDate.getSeconds(); // 6 degrees every second
            // setting the rotate CSS attribute to those degree values -->
            component.getElementById("seconds").style.cssText =
                "-webkit-transform:rotate(" + s + "deg);";
            component.getElementById("minutes").style.cssText =
                "-webkit-transform:rotate(" + m + "deg);";
            component.getElementById("hours").style.cssText =
                "-webkit-transform:rotate(" + h + "deg);";
        }, 1000);
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
        return 'time-clock';
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
customElements.define(Clock.name, Clock);