import React, {Component} from "react";
import Nav from "./Nav.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import Notification from "./Notification.jsx";
import ChatBar from "./ChatBar.jsx";


class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <MessageList>
          <Message />
          <Notification />
        </MessageList>
        <ChatBar />
      </div>
    );
  }
}
export default App;

