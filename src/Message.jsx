import React from "react";

function Message(props){

  let regex = /https?:\/\/\S+\.(?:jpg|jpeg|png|gif)(?:\?\S+)?/g;
  let imageURL = props.content.match(regex);
  //if there's text plus an image url, splice the image url out of the text content
  let parsedContent = imageURL ? props.content.replace(imageURL, "") : props.content;

  return (
    <div className="message">
      <div className={`message-username ${props.msgColorClass}`}>{props.username}</div>
      <div className="message-content">
        <div>
          {parsedContent}
        </div>
        <div>
          {imageURL &&
            <img className="chat-img" src={imageURL} />
          }
        </div>
      </div>
    </div>
  )
}

export default Message;