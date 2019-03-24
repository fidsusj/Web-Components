import { LitElement, html } from 'lit-element';

export class TimeClock extends LitElement {

    render() {
        return html`
            <link rel="stylesheet" type="text/css" href="/time-clock/time-clock.css" />
            
            <!-- Unfortunately styles specified in get styles do not get updated when calling requestUpdate() -->
            <!-- 30 degrees every hour -->
            <!-- 6 degrees every minute -->
            <!-- 6 degrees every second -->
            <style>
                #hours {
                     -webkit-transform: rotate(${30 * this.hours}deg);
                }
                #minutes {
                     -webkit-transform: rotate(${6 * this.minutes}deg);
                }
                #seconds {
                     -webkit-transform: rotate(${6 * this.seconds}deg);  
                }
             </style>
                    
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

    static get properties() {
        return {
            hours: {type: Number, reflect: true},
            minutes: {type: Number, reflect: true},
            seconds: {type: Number, reflect: true}
        };
    }

    constructor() {
        super();
        window.setInterval(() => {
            this.date = new Date();
            this.hours = this.date.getHours() % 12;
            this.minutes = this.date.getMinutes();
            this.seconds = this.date.getSeconds();
            this.requestUpdate();
        }, 1000);
    }

}
customElements.define("time-clock", TimeClock);