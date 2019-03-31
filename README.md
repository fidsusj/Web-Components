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