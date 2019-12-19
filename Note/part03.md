# a. Nodejs and Express
```
npm init => auto generate package.json file
```
In package.json file
```
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```
add new line `"start": "node index.js",`

## 1. Simple web server
In `index.js`
```
const http = require('http') ~ import http from 'http'
```

## 2. Express
```
npm install express --save
```

## 3. Nodemon
Nodemon will watch the files in the directory in which nodemon was started, and if any files change,
nodemon will automatically restart your node application.
```
npm install --save-dev nodemon
```

We can start our application with nodemon like this:
```
node_modules/.bin/nodemon index.js
```

To simply command, we can add 
package.json file:
```
{
  // ..
  "scripts": {
    "start": "node index.js",
    "watch": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```
and run command: `npm run watch`