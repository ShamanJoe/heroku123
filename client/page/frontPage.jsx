import React from "react";
import {ArticleCard, ArticleCardSideMenu} from "./articleCard";
import {fetchJSON} from "../fetchJSON";
import {useLoading} from "../useLoading";
import {getNav} from "../getNav";

export function FrontPage() {
    const {loading, error, data} = useLoading(async () =>
        fetchJSON("/api/article")
    );

    if (loading) {
        return <div>loading....</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }
    return (
        <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            {getNav()}

            <div className={"page-sidebar"}>
                <h1>All articles</h1>
                <div>
                    {data.map((article) => (
                        <ArticleCardSideMenu key={article.title} article={article}/>
                    ))}
                </div>
            </div>
            <div className={"page-main"}>
                <h1>All articles</h1>
                <div>
                    {data.map((article) => (
                        <ArticleCard key={article.title} article={article}/>
                    ))}
                </div>
            </div>
        </div>
    );
}