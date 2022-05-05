import React from "react";

export function ArticleCard({article: {title, plot, category, author}}) {
    return (
        <div id={"articlecard"}>
            <h3>{title}</h3>
            <h6>Category : {category}</h6>
            <p>{plot}</p>
            <h6>Author : {author}</h6>
        </div>
    );
}
export function ArticleCardSideMenu({article: {title}}) {
    return (
        <div id={"articlecardSideMenu"}>
            <h3>{title}</h3>
        </div>
    );
}