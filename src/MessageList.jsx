import React from "react";
import Notification from "./Notification.jsx";
import Message from "./Message.jsx";
import Sidebar from "./Sidebar.jsx";


function MessageList(props){
  return (
    <div className="messages-outer">
      <Sidebar onlineUsers={props.onlineUsers} />
      <main className="messages">
        {props.messages.map(elem =>
          elem.type === "incomingMessage" ?
            <Message
              currentUserId={props.currentUserId}
              msgUserId={elem.userId}
              key={elem.id}
              username={elem.username}
              content={elem.content}
              msgColorClass={elem.msgColorClass}
            />
            :
            <Notification key={elem.id} content={elem.content} />
        )}
      </main>
    </div>
  )
}

export default MessageList;