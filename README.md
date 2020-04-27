This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Available Scripts

In the project directory, you can run:

### INLINE_RUNTIME_CHUNK=false npm run build

Builds the app for production to the `build` folder. <br />
It also minifies the runtime js file instead of inline scripting it.

## Configuration post-build
In the build directory, go the static/ and create a folder call manifest and then create a json file called manifest.json

Include keys:
- runtime-main.js
- vendors-main.js
- main.js

## For local testing config
When serving react app on local server, run:
```bash
http-server --cors="*"
```
Avoiding any cors error when making Ajax call between two local hosted app.
 