import React from "react";
import Notification from "./Notification.jsx";
import Message from "./Message.jsx";

function MessageList(props){
  return (
    <main className="messages">
      <Message />
      <Notification />
    </main>
  )
}

export default MessageList;