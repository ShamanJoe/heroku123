import React, {useEffect, useState} from "react"
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Movie database exam</h1>
            <ul>
                <li><Link to={"/movies"}>List of all movies</Link></li>
                <li></li>
            </ul>
    </div>
}


async function fetchJSON(url) {
   const res = await fetch(url)
    if (!res.ok){
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`)
    }
    return await res.json();
}

function ListMovies() {
    const {loading, error, data} = useLoading(async () => fetchJSON("/api/movies")
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
    return <div>
        <h1>List of all movies</h1>
        <ul>
            {data.map((movie) => (
                <li key={movie.title}>{movie.title}</li>
            ))}
        </ul>
    </div>;
}

function Application() {
    return <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<FrontPage/>}/>
           <Route path={"/movies"} element={<ListMovies/>}/>
       </Routes>

    </BrowserRouter>
}

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