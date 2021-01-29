# Evaluate a News Article with Natural Language Processing

## Description

This project uses the MeaningCloud Sentiment Analysis API from meaningcloud.com.

This project allows users to perform Natural Language Processing (NLP) on articles or blogs found on other sites, and also to insert free text. Afterwards, the user can click on each highlighted word to know its characteristics.

### Installation

npm install You can use this command for starting a project. npm install downloads a package and it's dependencies.

npm run start Starts the server

npm run build-dev This command runs the app in the development mode. If you make corrections the page will reload automatically.

npm run build-prod This command builds the app for production to the dist folder. It connects project in production mode.

### Observations

It is very important to note that before performing the test using the Jest Framework it will be necessary to run the server with the command node src / server / index.js and open a new terminal and then run the test on this new terminal. Thus, the test can be performed against the postData function.
