import React, {useEffect, useState} from "react"
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import '../resources/style.css'

async function fetchJSON(url) {
   const res = await fetch(url)
    if (!res.ok){
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`)
    }
    return await res.json();
}

function ArticleCard( {article:{title, plot, category} }) {
    return <div>
        <h3>{title}</h3>
        <h5>{category}</h5>
        <div>{plot}</div>
    </div>
}

export function FrontPage() {

    const {loading, error, data} = useLoading(async () => fetchJSON("/api/article")
    )

    if (loading){
        return <div>loading....</div>
    }
    if (error){
        return <div>
            <h1>Error</h1>
            <div>{error.toString()}</div>
        </div>
    }
    return <div className={"page-wrap"}>
        <header className={"page-header"}>Daily News</header>
        <nav className={"page-nav"}>
            <Link to={"/"}>The Daily Mail</Link>
            <Link to={"/login"}>Log in</Link>
            <Link to={"/publish"}>Publish</Link>
        </nav>

        <div className={"page-main"}>
            <h1>All articles</h1>
            <div>
                {data.map((article) => (
                    <ArticleCard key={article.title} article={article}/>
                ))}
            </div>
        </div>
    </div>
}

function LoginPage() {
    return <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            <nav className={"page-nav"}>
                <Link to={"/"}>The Daily Mail</Link>
                <Link to={"/login"}>Log in</Link>
                <Link to={"/publish"}>Publish</Link>
            </nav>
        </div>
}

function PublishPage() {
    return <div className={"page-wrap"}>
            <header className={"page-header"}>Daily News</header>
            <nav className={"page-nav"}>
                <Link to={"/"}>The Daily Mail</Link>
                <Link to={"/login"}>Log in</Link>
                <Link to={"/publish"}>Publish</Link>
            </nav>
    </div>;
}

function Application() {
    return <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<FrontPage/>}/>
           <Route path={"/login"} element={<LoginPage/>}/>
           <Route path={"/publish"} element={<PublishPage/>}/>
       </Routes>

    </BrowserRouter>
}
//ERROR HANDLING
function useLoading(loadingFunction){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load(){
        try {
            setLoading(true);
            setData(await loadingFunction());
        }catch (error){
            setError(error)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    },[])

    return {loading, error, data}

}

ReactDOM.render(<Application/>, document.getElementById("app"))