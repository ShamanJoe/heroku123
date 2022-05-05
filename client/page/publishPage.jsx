import React, {useState} from "react";
import {getNav} from "../getNav";
import {postJSON} from "../postJSON";
import {Link, useNavigate} from "react-router-dom";

export function PublishPage() {
    async function createArticle(articles) {
        return await postJSON("/api/article", articles);
    }

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createArticle({category, title, plot, author});
        navigate("/");
        console.log("Added to database");
    }


    return(<div className={"page-wrap"}>
        <header className={"page-header"}>Daily News</header>
        {getNav()}
        <div className={"page-sidebar"}>
            <h1>All articles</h1>
            <div>
                <Link to={"/"}>Click here to go to articles</Link>
            </div>
        </div>
        <form onSubmit={handleSubmit} className={"page-main"}>
            <h1>Create new article</h1>
            <div>
                Category:
                <select required onChange={(e) => setCategory(e.target.value || null)}
                    value={category}>
                    <option value={""}></option>
                    <option value={"News"}>News</option>
                    <option value={"Sport"}>Sport</option>
                    <option value={"Crime"}>Crime</option>
                    <option value={"Finance"}>Finance</option>
                    <option value={"Kids"}>Kids</option>
                    <option value={"Other"}>Other</option>

                </select>
            </div>
            <div>
                Title:
                <input required value={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
                Plot:
                <textarea required value={plot} onChange={event => setPlot(event.target.value)} />
            </div>
            <div>
                Author:
                <input required value={author} onChange={event => setAuthor(event.target.value)} />
            </div>
            <button>Save</button>
        </form>
    </div>
);


    /*const [title, setTitle] = useState("");
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
    );*/
}