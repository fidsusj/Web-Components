class HelloWorld2 extends HTMLHeadingElement {
    constructor(){
        super();
    }

    static get observedAttributes() {
        return ['name'];
    }
    get name(){ return this.getAttribute('name'); }
    set name(val){ this.setAttribute('name', val); }

    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = `Hello ${this.name}`;
    }
}
customElements.define("hello-world2", HelloWorld2, { extends: "h1" });