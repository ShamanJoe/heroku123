import {ListMovies} from "../index";
import React from "react";
import * as ReactDOM from "react-dom";

describe("movies application", () =>{

    it("shows movie list", () =>{
        const element = document.createElement("div");
        ReactDOM.render(<ListMovies/>, element);
        expect(element.querySelector("h1").innerHTML)
            .toEqual("Movie database exam")
        expect(element.innerHTML).toMatchSnapshot();
    })
})