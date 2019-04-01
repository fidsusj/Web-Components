import {html, render} from './node_modules/lit-html/lit-html.d.ts';

const myTemplate = (name) => html`<p>Hello ${name}</p>`; //Returns a TemplateResult, lit-html is lazily rendered
render(myTemplate('World'), document.body); //Replaces all content of body node

const myTemplate2 = (data) => html`<div ?disabled=${!data.active}>Stylish text</div>`;
render(myTemplate2({active: false}), document.body);

const myTemplate3 = (data) => html`<my-list .listItems=${data.items}></my-list>`;
render(myTemplate3([1,2,3]), document.body);

const myTemplate4 = () => html`<button @click=${clickHandler}>Click Me!</button>`;
render(myTemplate4(() => console.log("clicked!")), document.body);

const myTemplate5 = html`<h1>Header</h1>`;
const myTemplate6 = html`${myTemplate5} <div>Here's my main page.</div>`;
render(myTemplate6(), document.body);

html`${user.isloggedIn ? html`Welcome ${user.name}` : html`Please log in`}`;
html`${() => {
    if (user.isloggedIn)
        return html`Welcome ${user.name}`;
    return html`Please log in`;  
}}`;

const items = [1,2,3];
const itemTemplates = [];

html`<ul>${items.map((item) => html`<li>${item}</li>`)}</ul>`;

items.forEach((item) => {itemTemplates.push(html`<li>${item}</li>`);});
html`<ul>${itemTemplates}</ul>`;

html`<ul>${repeat(items, (item) => item, (item, index) => html`<li>${index}: ${item}</li>`)}</ul>`;

const highlightStyles = { color: 'white', backgroundColor: 'red'};
html`<div style=${styleMap(highlightStyles)}>Hi there!</div>`;

const classes = { highlight: true, enabled: true, hidden: false };
html`<div class=${classMap(classes)}>Classy text</div>`;

const image = {alt: "description"};
html`<img src="/images/${ifDefined(image.filename)}">`;

const content = fetch('./content.txt').then(r => r.text());
html`${until(content, html`<span>Loading...</span>`)}`;

const immutableItems = ["Are","you","still","listening?"];
html`<div>${guard([immutableItems], () => immutableItems.map(item => html`${item}`))}</div>`;



