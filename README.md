# E-Commerse-Online-Shop

To create development environment 

1. Run **npm install** in main folder
2. Run **npm install** in client folder

We used [Create React App](https://github.com/facebook/create-react-app) for client development.

## Available Scripts in Client folder

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.


### `npm run scss` 

Analyze scss-files with stylelint. We use module [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard). It also fixes some problems, and report about problems, that can not fix in console. 

### `npm run flow` 

We use [flow type checker](https://flow.org/Analyze) code for mistakes in types. Run this script to find bugs.


## Available Scripts in Main folder

### `npm run dev` 
Creates both environments - client and server, connects to MongoDb and starts create-react-app. We use it for development, when we need running back-end and front-end.

## Documentation about product

Here you can find documantation about functionality of online-shop 
[functionality of online-shop](https://docs.google.com/document/d/1u6Sq1i__yRu5I65SMGQmzRpAuO7Xb23AcBXIyPzC7QM/edit)