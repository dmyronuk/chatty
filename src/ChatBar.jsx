import React from "react";

function ChatBar(props){

  return (
    <footer className="chatbar">
      <form className="chatbar-message-form" onSubmit={props.messageSubmitHandler}>
        <input name="username"  className="chatbar-username" defaultValue={props.currentUser.name} />
        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        <input className="hidden-elem" type="submit"/>
      </form>
    </footer>
  )
}

export default ChatBar;