import React from "react";
import {getNav} from "../getNav";

export function PublishPage() {
    return (
        <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            {getNav()}
        </div>
    );
}