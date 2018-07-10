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

  messageSubmitHandler = (event) => {
    event.preventDefault();
    let prevMessages = this.state.messages;
    let newMsg = {
      id: prevMessages.length + 1,
      username: event.target.username.value,
      content: event.target.message.value,
    }
    this.setState({
      messages: [...prevMessages, newMsg ]
    })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3000, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar messageSubmitHandler={this.messageSubmitHandler} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;

