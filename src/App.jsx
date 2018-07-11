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
      clientsConnected: 0,
    }
  };

  messageSubmitHandler = (message) => {
    let newMsg = {
        username: this.state.currentUser.name,
        content: message,
        type: "postMessage",
      }
    this.socket.send(JSON.stringify(newMsg));
  };

  notificationSubmitHandler = (newUsername) => {
    this.setState({
      currentUser: {name: newUsername}
    })
    let msgStr = `${this.state.currentUser.name} has changed their name to ${newUsername}`;
    let newMsg = {
        username: newUsername,
        content: msgStr,
        type: "postNotification",
      }
    this.socket.send(JSON.stringify(newMsg));
  };

  componentDidMount(){
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    //can also use socket.addEventListener("open", cb)
    this.socket.onopen = (event) => {
      console.log("Connected to server")
    };

    this.socket.onmessage = (event) => {
      let parsedData = JSON.parse(event.data);
      if(parsedData.type === "connectionNotification"){
        this.setState({
          clientsConnected: parsedData.numClients,
        })
      }else{
        let prevMessages = this.state.messages;
        this.setState({
          messages: [...prevMessages, parsedData ]
        })
      }
    }
  };

  render() {
    return (
      <div>
        <Nav clientsConnected={this.state.clientsConnected}/>
        <MessageList messages={this.state.messages} />
        <ChatBar
          messageSubmitHandler={this.messageSubmitHandler}
          notificationSubmitHandler={this.notificationSubmitHandler}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;

