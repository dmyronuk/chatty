const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid");

const PORT = 3001;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", (ws) => {
  console.log('Client connected');

  ws.on("message", function incoming(data) {
    let dataObj = JSON.parse(data);
    dataObj.id = uuid();

    switch(dataObj.type){
      case "postMessage":
        dataObj.type = "incomingMessage";
        break;

      case "postNotification":
        dataObj.type = "incomingNotification";
        break;

      default:
        throw new Error("Unknown event type " + dataObj.type);
        break;
    }

    let outData = JSON.stringify(dataObj);

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(outData);
      }
    });
  });

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on("close", () => console.log("Client disconnected"));
});