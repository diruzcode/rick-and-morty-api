
# rick-and-morty-api

## Setup

### Installing dependencies

1. `npm install`


### Installing version of nodejs

In order to use a specific version of nodejs you can use `nvm`. This is a tool that allows you to manage multiple versions of Node. js. Thanks to nvm you can install the latest versions of node including npm or install a specific version and be able to switch between versions easily from the command line.

#### Setup NVM version

* To install nvm run the following commands: 
  
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  ```
  *This command will install nvm into a new directory under your user named /.nvm and add a variable to bashrc.*

* After installing bashrc should be updated using the command:

   ```bash
   source ~/.bashrc  
  ```
  *Other variants of the command are as follows: `~/.bash_profile`, `~/.zshrc`, or `~/.profile`*

For more information about nvm consult its repository: [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating)

* To install any version of Node.js available, use the command:

 ```bash
  nvm install v16.18.1
  ```
  **NOTE**: *To list the available LTS versions, run the command: `nvm ls-remote`*

* To use the installed version, run the command:

``` bash
nvm use v16.18.1
```
**NOTE:** *To set a version as default, use the command: `nvm alias default v16.18.1`*


### Create .env 


1. cp .env.local .env
2. complete the information and after to create the database, execute the migration with sequealize.
3. after to execute the migration you can execute the sql file to complete the table characters

### Run run project

To run the project using the terminal, do the following:

1. node index.js
    * this run in port 3000 for default
2. swagger you can show in http://localhost:3000/api-docs
