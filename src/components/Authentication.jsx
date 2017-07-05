import React from "react";
import { render } from "react-dom";

export default function Authentication({ authenticated, login, logout }) {
  return (
    <div>
      {!authenticated && <button onClick={login}>login</button>}
      {authenticated && <button onClick={logout}>logout</button>}
    </div>
  );
}
