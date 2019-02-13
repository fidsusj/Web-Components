import { LitElement, html } from 'lit-element';

export class TimeClock extends LitElement {

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
              
    `;
    }

    constructor() {
        super();
        this.component = this.shadowRoot;

        window.setInterval(() => {
            var oDate = new Date();
            var h = 30 * ((oDate.getHours() % 12) + oDate.getMinutes() / 60); // 30 degrees hour
            var m = 6 * oDate.getMinutes(); // 6 degrees every minute
            var s = 6 * oDate.getSeconds(); // 6 degrees every second
            // setting the rotate CSS attribute to those degree values -->
            this.component.getElementById("seconds").style.cssText =
                "-webkit-transform:rotate(" + s + "deg);";
            this.component.getElementById("minutes").style.cssText =
                "-webkit-transform:rotate(" + m + "deg);";
            this.component.getElementById("hours").style.cssText =
                "-webkit-transform:rotate(" + h + "deg);";
        }, 1000);
    }

    static get properties() {
        return {

        };
    }

    static get name(){
        return 'time-clock';
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
customElements.define(TimeClock.name, TimeClock);