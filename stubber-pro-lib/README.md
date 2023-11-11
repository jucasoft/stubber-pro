# stubber-pro

Stubber-Pro is a tool designed to help developers manage, capture, and simulate HTTP calls in Node.js-based projects. Whether you are developing a front-end application or a back-end service, Stubber-Pro offers practical features such as call capture, response storage, and simulation. With an integrated front-end interface, which facilitates its management. Stubber-Pro aims to be a reliable companion in the development process, facilitating development, testing, and debugging.

# Installation

To use StubberPro, you need to use a custom webpack configuration.
You can do this with several systems, I preferred to use `@angular-builders/custom-webpack`.
If you're not using the latest version of Angular, you will need to specify the library version, for example, for Angular 13 the library will be `@angular-builders/custom-webpack@13`.
- `npm i -D @angular-builders/custom-webpack`
- In angular.json:
 ```
{
  "projects": {
    ...
    "{{project}}": { 
      ...
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", <== change builder
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js",
              "mergeRules": {
                "externals": "replace"
              }
            },
            ...
          },
          ...
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server", <== change builder
          "options": {
            "browserTarget": "{{project}}:build", <== IMPORTANT replace {{project}} with the project name
            "port": 4400, <== only if you need it
            "proxyConfig": "./proxy.conf.js", <== only if you need it
          },
          ...
```

- Add `webpack.config.js` with the following code
```js
module.exports = {
  devServer: {
    historyApiFallback: true,
    setupMiddlewares: function (middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack - dev - server is not defined');
      }
      console.log('==================== setupMiddlewares ========================')
      return middlewares;
    }
  }
};
```

 - Start Angular in dev mode.
 - In the first lines of the console, if everything works correctly, you will see the message '==================== setupMiddlewares ========================'.
 - Ok, it works, we deserve a coffee, for now, we have only allowed our Angular project to have a custom webpack configuration, now we need to add the StubberPro library.
 - npm i -D @jucasoft\stubber-pro
 - Modify the contents of the file webpack.config.js with:
```js
"use strict";
exports.__esModule = true;
var stubber_pro = require("@jucasoft/stubber-pro");
var path = require("path");
console.log('stubberPro: ', stubber_pro.stubberPro);
var STUBBER_CONF = {
  basePath: 'stubber-pro',
  appUri: '/stubber-pro/admin',
  apiUri: '/stubber-pro/admin/api/v1',
  activeDefaultValue: true,
  getKey: function (opt, req) {
    // return path.join(req.url, `${req.method}${new Date().getTime()}.json`)
    return path.join(req.originalUrl, "".concat(req.method));
  },
  routes: [
    {
      pathFilter: [],
      routePath: '/api/*' // percorso che si vuole catturare
    },
  ]
};
module.exports = {
  devServer: {
    historyApiFallback: true,
    setupMiddlewares: function (middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack - dev - server is not defined');
      }
      
      // percorso adatto a progetti angular
      var appStaticFileLocation = path.join(__dirname, 'node_modules/@jucasoft/stubber-pro/src/lib/app'); 
      
      // percorso adatto a progetti nx
      // const appStaticFileLocation = path.join(__dirname, "../", 'node_modules/stubber-pro/src/lib/app') 
      
      // IMPORTANTE viene stampato il percorso assoluto, verificare che sia corretto
      console.log('appStaticFileLocation: ', appStaticFileLocation); 
      
      (0, stubber_pro.stubberPro)(devServer, STUBBER_CONF, appStaticFileLocation);
      return middlewares;
    }
  }
};
```
- Restart Angular in dev mode.
- Open http://localhost:4200/stubber-pro/admin/ to access the administrative section of stubber-pro (In this example, I have assumed that you are using port 4200).

