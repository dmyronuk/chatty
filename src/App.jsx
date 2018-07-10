import React, {Component} from "react";
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


class App extends Component {
  constructor(props){
    super(props);
    // currentUser is optional - if currentUser is not defined, it means the user is Anonymous
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id:1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        {
          id:3,
          username: "Joe",
          content: "K cool."
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;

