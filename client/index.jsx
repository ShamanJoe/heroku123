import React, {useEffect, useState} from "react"
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Movie database exam</h1>
            <ul>
                <li><Link to={"/movies"}>List of all moviessss</Link></li>
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

function MovieCard( {movie:{title, plot} }) {
    return <div>
        <h3>{title}</h3>
        <div>{plot}</div>
    </div>
}

export function ListMovies() {
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
               <MovieCard key={movie.title} movie={movie}/>
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