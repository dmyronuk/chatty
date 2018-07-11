import React from "react";
import Notification from "./Notification.jsx";
import Message from "./Message.jsx";

function MessageList(props){
  return (
    <main className="messages">
      {props.messages.map(elem =>
        elem.type === "incomingMessage" ?
          <Message
            key={elem.id}
            username={elem.username}
            content={elem.content}
            msgColorClass={elem.msgColorClass}
          />
          :
          <Notification key={elem.id} content={elem.content} />
      )}
    </main>
  )
}

export default MessageList;