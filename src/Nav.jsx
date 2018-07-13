import React from "react";

function Nav(props){
  const suffix = props.clientsConnected === 1 ? "" : "s" ;

  return (
    <nav className="navbar">
      <div>
        <a href="/">
          <h1 className="navbar-brand"> Chatty </h1>
        </a>
      </div>
      <div className="clients-connected-msg">
        {`${props.clientsConnected} user${suffix} online`}
      </div>
    </nav>
  )
}

export default Nav;