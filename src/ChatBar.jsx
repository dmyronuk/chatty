import React from "react";

function ChatBar(props){
  return (
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  )
}

export default ChatBar;