import React, {Component} from "react";
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props){
    super(props);
    // currentUser is optional - if currentUser is not defined, it means the user is Anonymous
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
    }
  }

  messageSubmitHandler = (event) => {
    if(event.key === "Enter"){
      let newMsg = {
        username: this.state.currentUser.name,
        content: event.target.value,
      }
      this.socket.send(JSON.stringify(newMsg));
    }
  };

  usernameSubmitHandler = (event) => {
    if(event.key === "Enter"){
      this.setState({
        currentUser: {name: event.target.value}
      })
      // this.socket.send(JSON.stringify(newMsg));
    }
  };

  componentDidMount = () => {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = (event) => {
      console.log("Connected to server")
    };

    this.socket.onmessage = (event) => {
      let prevMessages = this.state.messages;
      let newMsg = JSON.parse(event.data);
      this.setState({
        messages: [...prevMessages, newMsg ]
      })
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar
          usernameSubmitHandler={this.usernameSubmitHandler}
          messageSubmitHandler={this.messageSubmitHandler}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;

