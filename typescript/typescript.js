import { LitElement, html, customElement, property } from 'lit-element';

@customElement('my-element')
export class MyElement extends LitElement {
    @property({type : String})  property1 = 'Hello World';
    @property({type : Array})   property2 = [1,2,3];
    @property({type : Object})  property3 = { 'sub-property': 'value' };

    render() {
        return html`
          <p>property1: ${this.property1}</p>
          <p>property2[0]:</p>${this.property2[0]}</p>
          <p>property3['sub-property']: ${this.property3['sub-property']}</p>
    `;
    }
}
customElements.define('my-element', MyElement);