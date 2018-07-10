import React from "react";

function ChatBar(props){

  return (
    <footer className="chatbar">
      <input name="username"  className="chatbar-username" onKeyDown={props.usernameSubmitHandler} defaultValue={props.currentUser.name} />
      <input name="message" className="chatbar-message" onKeyDown={props.messageSubmitHandler} placeholder="Type a message and hit ENTER" />
    </footer>
  )
}

export default ChatBar;