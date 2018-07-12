const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require("uuid");

const PORT = 3001;
const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const onlineUsers = {};

//Helper used when a client connects or disconnects from server
//Broadcasts message to all connected clients so that app state can be updated to reflect total clients connected
const connectionHandler = (eventVerb) => {
  console.log(`Client ${eventVerb}`);
  let connMsg = {
    numClients: wss.clients.size,
    onlineUsers: onlineUsers,
    type: "connectionNotification",
  };

  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(connMsg));
    }
  });
};

//assign user a unique id and store user in onlineUsers
const userIdAssignHandler = (ws, id) => {
  let userIdMsg = {
    id: id,
    type: "userIdNotification",
  };
  ws.send(JSON.stringify(userIdMsg));
};

//Helper user when a client connects to server
//Broadcast only to the connecting client, assigning a unique user id
const assignColorClass = () => {
  let choices = ["A", "B", "C", "D"];
  let choiceInd = Math.floor(Math.random() * 4);
  return `msg-style-${choices[choiceInd]}`;
};

wss.on("connection", (ws) => {
  let colorClass = assignColorClass();
  let userId = uuid();
  //global object that keeps track of all online userIds and usernames
  onlineUsers[userId] = "Anonymous";
  userIdAssignHandler(ws, userId);
  connectionHandler("connected");

  ws.on("message", function incoming(data) {
    let dataObj = JSON.parse(data);
    dataObj.id = uuid();

    switch(dataObj.type){
      case "postMessage":
        dataObj.msgColorClass = colorClass;
        dataObj.type = "incomingMessage";
        break;

      //name change message sent from client to server
      case "postNotification":
        onlineUsers[dataObj.userId] = dataObj.username;
        dataObj.msgColorClass = "#000000";
        dataObj.type = "incomingNotification";
        dataObj.onlineUsers = onlineUsers;
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
    // console.log(userId);
    delete onlineUsers[userId];
    // Object.keys(onlineUsers).forEach(elem => console.log(elem, onlineUsers[elem]))
    console.log(onlineUsers)
  });
});