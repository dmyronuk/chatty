import React, {Component} from "react";

class ChatBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: props.currentUser.name,
      message: "",
    }
  };

  messageSubmitHandler = (event) => {
    if(event.key === "Enter"){
      this.props.messageSubmitHandler(this.state.message);
      this.state.message = "";
    }
  };

  notificationSubmitHandler = (event) => {
    if(event.key === "Enter"){
      this.props.notificationSubmitHandler(this.state.username);
    }
  };

  messageChangeHandler = (event) => {
    this.setState({message: event.target.value});
  };

  userChangeHandler = (event) =>{
    this.setState({username: event.target.value});
  };

  //since both username changes and new messages are being pushed to app.state.messages
  //we're going to use the same handler on both
  render(){
    return (
      <footer className="chatbar">
        <input
          name="username"
          className="chatbar-username"
          onChange={this.userChangeHandler}
          onKeyDown={this.notificationSubmitHandler}
          value={this.state.username}
        />
        <input
          name="message"
          className="chatbar-message"
          onChange={this.messageChangeHandler}
          onKeyDown={this.messageSubmitHandler}
          value={this.state.message}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    )
  }
}

export default ChatBar;