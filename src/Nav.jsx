import React from "react";

function Nav(props){
  const suffix = props.clientsConnected === 1 ? "" : "s" ;

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className="clients-connected-msg">
        {`${props.clientsConnected} user${suffix} online`}
      </div>
    </nav>
  )
}

export default Nav;