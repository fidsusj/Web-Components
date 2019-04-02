# Build your first web component with Polymer

For further details please see the [lit-html](https://lit-html.polymer-project.org/) and 
[LitElement](https://lit-element.polymer-project.org/) documentation.

In case you want to develop an application based around web components, have a look at the 
[PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/).

## Installation Guide

1.  Install pre-requisites for Polymer CLI (git, npm, Node.js). 

2.  Install Polymer CLI.

        npm install -g polymer-cli@next

3. Install a bash shell. (Optional: Use Git Bash, Cygwin or something similar)

    3.1 Go to _settings_ > _update and security_ > _for developers_ and select _developer mode_.
    
    3.2 From the start menu, search for _turn windows features on or off_ and select _windows subsystem for linux_.
    
    3.3 Restart your computer
    
    3.4 Log in as admin
    
    3.5 Run _Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux_ in PowerShell
    
    3.6 Go to the microsoft store and download a unix distribution
    
    3.7 Go to your unix command line
    
    3.8 Create a new user (username and password)
    
    3.9 Run bash to install it
    
4.  Change directory to the top-level project folder and install project dependencies.

        cd polymer-3-first-element
        npm install
   
5. Set up a project in the IDE of your choice.

6. Initialize a Polymer 3 element project.

        polymer init polymer-3-element 
        
7. Install the LitElement dependency.

        npm install lit-element
     
8. To preview your element, run the Polymer development server from the top-level project folder.

        polymer serve --open
        
## Tutorial

The properties and behaviours of a web component are specified through it's class. Autonomous custom elements normally 
inherit from HTMLElement, while Polymer elements can inherit from the LitElement base class. LitElement enables the 
development of lightweight and fast web components due to several optimizations and the usage of lit-html as a 
templating engine. For further details please have a look at the [slides](sildes.pdf).

Below you can find the basic scheme of a web component built with LitElement:

    export class MyElement extends LitElement {
        
        render() {
            return html`
                //Here comes the markup
            `;
        }
                
        static get styles() {
            return css`
                //Here comes the styling
            `;
        }
        
        static get properties() {
            return {
                //Here comes the properties
            };
        }
        
        constructor() {
            super();
            //Here properties get initialized
        }
    }
    customElements.define('my-element', MyElement);
    
In this tutorial, we will try to built a web component, that looks like the one below:

[logo]: images/web_component.png

As you can see, it represents a simple to-do list, where users enter a task to be done, which is then shown in a list of 
tasks beneath. Filtering makes it possible to only display list items that equal to a specific category. Furthermore, 
deleting all completed tasks should be possible.

To start off, we first need to provide the properties that the web component needs to have. 
        
        import { LitElement, html, css } from 'lit-element';
        export class MyElement extends LitElement {
        
        ...
        
            static get properties() {
                return {
                    todos: { type: Array },
                    filter: { type: String },
                    task: { type: String }
                };
            }
            
        ...
        
        }

Remember that only the types String, Number, Boolean, Array and Object are allowed. There are a bunch of other 
configurations that you can set in the configuration object for each property (see the [slides](sildes.pdf)). 

Next, we need to initialize the properties with default values, which triggers the first rendering.

        export class MyElement extends LitElement {
        
        ...
        
            constructor() {
                super();
                this.todos = [{task: "Go shopping", complete: false}, {task: "Clean the car", complete: true}];
                this.filter = VisibilityFilters.SHOW_ALL;
                this.task = '';
            }
            
        ...
        
        }

Lit-html is thought to be used as a library for defining render functions as functions of a state. This means that every 
time, we change the reference to the value behind a property, LitElement will re-render the web components markup parts 
affected by this change of state. Other parts of the markup won't get touched, which makes the web component faster to 
re-render.

After we have defined and initialized the web components properties, it's time to create the rendering template for the 
web component. Therefore we first need to import several external web components provided by 
[vaadin](https://vaadin.com/components):

        import '@vaadin/vaadin-text-field/vaadin-text-field';
        import '@vaadin/vaadin-button/vaadin-button';
        import '@vaadin/vaadin-checkbox/vaadin-checkbox';
        import '@vaadin/vaadin-radio-button/vaadin-radio-button';
        import '@vaadin/vaadin-radio-button/vaadin-radio-group';
        
Now we can create the template that is later on rendered into the shadow DOM using tagged template literals. The 
template literals are tagged with the html parser function provided by lit-html, which parses custom syntax elements to 
native markup. To get an insight into which custom syntax elements exist and common development patterns, please have a 
look at the [slides](sildes.pdf). or the [cheatsheet](cheatsheet.js). The _render_ function returns an instance of 
_TemplateResult_ which is then appended to the shadow DOM. 

        const VisibilityFilters = {
            SHOW_ALL: 'All',
            SHOW_ACTIVE: 'Active',
            SHOW_COMPLETED: 'Completed'
        };

        export class MyElement extends LitElement {
        
        ...
        
            render() {
                return html`
                    <div>
                        <vaadin-text-field
                          placeholder="Enter your task here..."
                          value="${this.task}">
                        </vaadin-text-field>
                        <vaadin-button theme="primary">Add Todo</vaadin-button>
                    </div>
                    <div>
                    ${
                        this.applyFilter(this.todos).map(todo => html`
                          <div>
                            <vaadin-checkbox ?checked="${todo.complete}">${todo.task}</vaadin-checkbox>
                          </div>
                          `;
                        )
                    }
                    </div>
                    <vaadin-radio-group class="visibility-filters" value="${this.filter}">
                    ${
                        Object.values(VisibilityFilters).map(filter => html`
                          <vaadin-radio-button value="${filter}">
                            ${filter}
                          </vaadin-radio-button>
                          `;
                        )
                    }
                    </vaadin-radio-group>
                    <vaadin-button >Clear Completed</vaadin-button>`;
            }
            
        ...
        
            applyFilter(todos) {
                switch (this.filter) {
                    case VisibilityFilters.SHOW_ACTIVE:
                        return todos.filter(todo => !todo.complete);
                    case VisibilityFilters.SHOW_COMPLETED:
                        return todos.filter(todo => todo.complete);
                    default:
                        return todos;
                }
            }
        
        }

To dynamically set markup you can use _${}_ to evaluate any JavaScript expression, that returns either a result of a 
primitive type (String, Number, Boolean) or an Array, DOM node or even another TemplateResult. To have an insight into 

The last thing, that we need to do in order to complete the web component, is to add _EventListeners_ to native or 
custom events. To register event listeners, you could use four different possibilities:

- @<<event-name>>="${(evt) => { ... }}"
- .addEventListener(() => { ... }) in constructor (if event might occur before element has been added to the DOM)
- firstUpdated callback (if event can’t occur before component has been rendered for the first time)
- connectedCallback (if attached to foreign element)

        export class MyElement extends LitElement {
        
        ...
        
            render() {
                return html`
                    ...
                    <vaadin-text-field
                      placeholder="Enter your task here..."
                      value="${this.task}"
                      @change="${this.updateTask}">
                    </vaadin-text-field>
                    <vaadin-button theme="primary" @click="${this.addTodo}">
                      Add Todo
                    </vaadin-button>
                    ...
                    <vaadin-checkbox
                      ?checked="${todo.complete}"
                      @change="${
                        e => this.updateTodoStatus(todo, e.target.checked)
                      }">
                      ${todo.task}
                    </vaadin-checkbox>
                    ...
                    <vaadin-radio-group
                    class="visibility-filters"
                    value="${this.filter}"
                    @value-changed="${this.filterChanged}">
                    ...
                    <vaadin-button @click="${this.clearCompleted}">
                    Clear Completed
                    </vaadin-button>
                `;
            }
            
        ...
            updateTask(e) {
                this.task = e.target.value;
            }
            
            updateTodoStatus(updatedTodo, complete) {
                this.todos = this.todos.map(todo =>
                    updatedTodo === todo ? { ...updatedTodo, complete } : todo
                );
            }
            
            filterChanged(e) {
                this.filter = e.target.value;
            }
            
            clearCompleted() {
                this.todos = this.todos.filter(todo => !todo.complete);
            }

        }
        
That was it! Wasn't is easy? 