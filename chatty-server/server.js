const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid");

const PORT = 3001;
const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

//Helper used when a client connects or disconnects from server
//Broadcasts message to all connected clients so that app state can be updated to reflect total clients connected
const connectionHandler = (eventVerb) => {
  console.log(`Client ${eventVerb}`);
  let connMsg = {
    numClients: wss.clients.size,
    type: "connectionNotification",
  };
  let connMsgJSON = JSON.stringify(connMsg);

  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(connMsgJSON);
    }
  });
}

wss.on("connection", (ws) => {
  connectionHandler("connected");

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

    //Broadcast new message data
    let outData = JSON.stringify(dataObj);
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(outData);
      }
    });
  });

ws.on("close", () => {
    connectionHandler("disconnected");
  });
});