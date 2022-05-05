import React, {useState} from "react";
import {getNav} from "../getNav";
import {ArticleCard} from "./articleCard";
import {fetchJSON} from "../fetchJSON";

export function PublishPage() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [plot, setPlot] = useState("");
    const [category, setCategory] = useState("");

    async function publishArticle(){
        e.preventDefault();
        await fetchJSON("/api/article", {
            method:"post",
            json:{title, plot, author}
        });
        setTitle("");
        setAuthor("");
        setPlot("");
        setCategory("");

        window.location.href("/")
    }
    return (
        <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            {getNav()}
            <div className={"page-sidebar"}>
                <h1>Topics</h1>
            </div>
            <form onSubmit={publishArticle} className={"page-main"}>
                <h1>Add article</h1>
                <div>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    Author:
                    <input value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                    Plot:
                    <textarea value={plot} onChange={(e) => setPlot(e.target.value)}/>
                </div>
            </form>
        </div>
    );
}