import React from "react";
import {fetchJSON} from "../fetchJSON";
import {useLoading} from "../useLoading";
import {getNav} from "../getNav";

export function Profile() {
    const {loading, data, error} = useLoading(async () => {
        return await fetchJSON("/api/login");
    });

    if (loading) {
        return <div>Please wait...</div>;
    }
    if (error) {
        return <div>Error! {error.toString()}</div>;
    }

    return (
        <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            {getNav()}
            <div className={"page-main"}>
            <h1>
                Profile for {data.name} ({data.email})
            </h1>
            <div>
                <img src={data.picture} alt={"Profile picture"}/>
            </div>
            </div>
        </div>
    );
}