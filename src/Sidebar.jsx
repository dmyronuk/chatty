import React from "react";

function Sidebar(props){
  let users = props.onlineUsers;

  return (
    <div className="sidebar">
      <div className="usernames-container">
        <div className="online-heading">Online</div>
        {Object.keys(users).map(elem =>
          <div className="username-block" key={elem}> {users[elem]} </div>
        )}
      </div>
    </div>
  )
}


export default Sidebar;