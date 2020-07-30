This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## Deploying to prod: `npm run build` -> `npm run deploy` -> `npm run postdeploy`

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

Also sets the REACT_APP_STAGE variable to 'prod' which, given config.js, ensures that my production backend is used.

### `npm run deploy`
Deploys the build folder to my s3 bucket.

### `npm run postdeploy`
Invalidates Cloudfront distributions for both root and www.