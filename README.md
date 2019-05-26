# prime
Displays a list of Users in an Organisation. Each User consists of Name, Email, Roles (Owner or Employee), Organisation, Organisation Features (Trade Vault, Inventory, Analytics), Country...

This app was built with ReactJS and Redux using Webpack 4. <br>

The data was stored in Google Firebase. A simple form validation was implemented to check for the required fields.<br>

Code syntax and styling was checked using ESLint with Flow for type-checking of the React components. <br>

Styling was done with the Bootstrap CSS framework to match the UX/UI design:

* [https://s3-ap-southeast-2.amazonaws.com/prototype.primexconnect.com/test/Data.png](https://s3-ap-southeast-2.amazonaws.com/prototype.primexconnect.com/test/Data.png)

* [https://s3-ap-southeast-2.amazonaws.com/prototype.primexconnect.com/test/Layout.png](https://s3-ap-southeast-2.amazonaws.com/prototype.primexconnect.com/test/Layout.png)

### `Installation`

Clone the repository and install with:<br>

```
npm install
```

### `npm run start`

Runs the webpack-dev-server in development mode. Open a browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

### `npm run lint`

Checks the code for styling and syntax errors using ESLint.<br>

### `npm run flow`

Type checks the ReactJS components of the app using [Flow](https://flow.org/).<br>

