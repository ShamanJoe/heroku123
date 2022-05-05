import {Link} from "react-router-dom";
import React from "react";

export function getNav() {
    return <nav className={"page-nav"}>
        <Link to={"/"}>The Daily Mail</Link>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/publish"}>Publish</Link>
        <Link to={"/login/profile"}>Profile</Link>
    </nav>;
}