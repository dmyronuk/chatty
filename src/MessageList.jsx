import React from "react";

function MessageList(props){
  return (
    <main className="messages">
      {props.children}
    </main>
  )
}

export default MessageList;