import React from "react";
import errorGIF from "../assets/Error 404.gif";

function NotFound() {
  return (
    <div>
      <img src={errorGIF} alt="not found" />
      <h1>This page is not Found</h1>
    </div>
  );
}

export default NotFound;
