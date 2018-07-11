import React from "react";

function Notification(props){
  return (
    <div className="message system">
      {props.content}
    </div>
  )
}

export default Notification;