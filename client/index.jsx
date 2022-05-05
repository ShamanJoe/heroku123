import React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import "../resources/style.css";
import {Profile} from "./page/profile";
import {LoginCallback} from "./page/loginCallback";
import {PublishPage} from "./page/publishPage";
import {LoginPage} from "./page/loginPage";
import {FrontPage} from "./page/frontPage";

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/publish"} element={<PublishPage />} />
        <Route path={"/login/callback"} element={<LoginCallback />} />
        <Route path={"/login/profile"} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
