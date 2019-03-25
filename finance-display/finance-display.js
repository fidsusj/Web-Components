import { LitElement, html } from 'lit-element';
import './finance-list';

export class FinanceDisplay extends LitElement {

    render() {
        return html`
            <finance-list restriction="all"><finance-list>
        `;
    }

}
customElements.define("finance-display", FinanceDisplay);