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
      onlineUsers: [],
      messages: [],
      clientsConnected: 0,
    }
  };

  messageSubmitHandler = (message) => {
    //before submitting message check if message is empty string
    if(message.trim()){
      let newMsg = {
        username: this.state.currentUser.name,
        userId: this.state.currentUser.id,
        content: message,
        type: "postMessage",
      }
      this.socket.send(JSON.stringify(newMsg));
    }
  };

  notificationSubmitHandler = (newUsername) => {

    //send name change notification to socket server for broadcast to all other connected clients
    let msgStr = `${this.state.currentUser.name} has changed their name to ${newUsername}`;
    let newMsg = {
        username: newUsername,
        userId: this.state.currentUser.id,
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
      let prevMessages;
      //update state of app in response to notification broadcast from server to client
      switch(parsedData.type){
        case "connectionNotification":
          this.setState({
            onlineUsers: parsedData.onlineUsers,
            clientsConnected: parsedData.numClients,
          })
          break;

        //when user first connects, server sends client a user UUID and app updates its state to include this id
        case "userIdNotification":
          let newCurrentUserState = Object.assign(this.state.currentUser, {id: parsedData.id});
          this.setState({
            currentUser: newCurrentUserState
          })
          break;

        //in response to a new message
        case "incomingMessage":
          prevMessages = this.state.messages;
          this.setState({
            messages: [...prevMessages, parsedData ]
          })
          break;

        //in response to user name change
        case "incomingNotification":
          prevMessages = this.state.messages;
          //separate out online users and message data from the incoming data object
          let onlineUsers = parsedData.onlineUsers;
          delete parsedData.onlineUsers;

          this.setState({
            onlineUsers: onlineUsers,
            messages: [...prevMessages, parsedData ]
          })
          break;
      }
    }

    //send msg to tell the server to delete userId from onlineUsers
    this.socket.onclose = (event) => {
      let closeMsg = {
        type: "closeMsg",
        userId: this.state.currentUser.id,
      }
      this.socket.send(JSON.stringify(closeMsg));
    };
  };

  componentDidUpdate() {
    // window.scrollTo(0, document.body.scrollHeight) - scrolls window to bottom of page showing latest message;
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
          onlineUsers={this.state.onlineUsers}
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

