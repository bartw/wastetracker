import React from "react";

export default function Authentication({ isAuthenticated, userName, login, logout }) {
  return (
    <div>
      <h2>Welcome {userName}</h2>
      {!isAuthenticated && <button onClick={login}>login</button>}
      {isAuthenticated && <button onClick={logout}>logout</button>}
    </div>
  );
}
