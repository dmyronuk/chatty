import React, {Component} from "react";
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props){
    super(props);
    // currentUser is optional - if currentUser is not defined, it means the user is Anonymous
    // currentUser.id state will be assigned by server when client first connects
    this.state = {
      currentUser: {
        name: "Anonymous",
        id: null,
      },
      messages: [],
      clientsConnected: 0,
    }
  };

  messageSubmitHandler = (message) => {
    let newMsg = {
        username: this.state.currentUser.name,
        userId: this.state.currentUser.id,
        content: message,
        type: "postMessage",
      }
    this.socket.send(JSON.stringify(newMsg));
  };

  notificationSubmitHandler = (newUsername) => {

    //send name change notification to socket server for broadcast to all other connected clients
    let msgStr = `${this.state.currentUser.name} has changed their name to ${newUsername}`;
    let newMsg = {
        username: newUsername,
        content: msgStr,
        type: "postNotification",
      }
    this.socket.send(JSON.stringify(newMsg));

    //update state of current user
    let newCurrentUserState = Object.assign(this.state.currentUser, {name: newUsername});
    this.setState({
      currentUser: newCurrentUserState
    });
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
      //update state of app in response to notification broadcast from server to client
      if(parsedData.type === "connectionNotification"){
        this.setState({
          clientsConnected: parsedData.numClients,
        })

      //when user first connects, server sends client a user UUID and app updates its state to include this id
      }else if(parsedData.type === "userIdNotification"){
        let newCurrentUserState = Object.assign(this.state.currentUser, {id: parsedData.id});
        this.setState({
          currentUser: newCurrentUserState
        })

      //update state of app in response to message broadcast from server to client
      }else{
        let prevMessages = this.state.messages;
        this.setState({
          messages: [...prevMessages, parsedData ]
        })
      }
    }
  };

  componentDidUpdate() {
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo({
      top: document.body.scrollHeight,
      left:0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div>
        <Nav clientsConnected={this.state.clientsConnected}/>
        <MessageList
          currentUserId={this.state.currentUser.id}
          messages={this.state.messages}
        />
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

