import React from "react"
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

function ListMovies() {
    return <div>
        <h1>List of all movies</h1>
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

ReactDOM.render(<Application/>, document.getElementById("app"))