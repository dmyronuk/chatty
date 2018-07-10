import React from "react";
import Notification from "./Notification.jsx";
import Message from "./Message.jsx";

function MessageList(props){

  return (
    <main className="messages">
      {props.messages.map(elem =>
        <Message key={elem.id} username={elem.username} content={elem.content} />
      )}
    </main>
  )
}

export default MessageList;