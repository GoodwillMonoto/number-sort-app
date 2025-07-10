# Getting Started with Create React App

### `'Node.js and npm (Node Package Manager) required'`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### ` Navigate to  folder  named 'number-sort-app'`

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs packages, then

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Design Decisions

I decided to structure the project around modules thus allowing room for the project to grow when needed.

I opted to externalise most of the logic out of the component to allow better readability  and testing.

To maintain simplicity in handling state I made use of zustand, a lightweight state management library.

# Testing

To test the component I would  first identify the core areas functionality.

I would then prepare a list of test cases for the individual areas.

I would test both path success and failure paths.

I would ensure input validation done and security tests are conducted as well.

I would also ensure to include tests that evaluate performance

I would conduct these tests with a test library such as Jest.









