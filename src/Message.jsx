import React from "react";

function Message(props){
  return (
    <div className="message">
      <span className={`message-username ${props.msgColorClass}`}>{props.username}</span>
      <span className="message-content">{props.content}</span>
    </div>
  )
}

export default Message;