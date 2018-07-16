# Chatty

## About
Real-time chat app build with React and websockets.

## Screenshots
![Sample Chat Session](https://raw.githubusercontent.com/dmyronuk/chatty/master/screenshots/demo.gif)

## Dependencies
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

## Usage
- From the /chatty-server directory run ```npm install``` and then ```node server.js``` to start the websocket server
- From root run ```npm install``` and then ```npm start``` to fire up the react dev server
- Open browser to [localhost](http://127.0.0.1:3000) and start chatting
- To share an image, copy/paste its url into the chatbar 

## Issues
- If multiple image urls are posted to chat in a single message, some images will not render correctly

## Roadmap
- Allow renders to select an online user and render only messages posted by that user
- Fix regex bugs when user posts an imageurl 


