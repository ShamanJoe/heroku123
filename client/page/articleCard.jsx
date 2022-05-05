import React from "react";

export function ArticleCard({article: {title, plot, category, author}}) {
    return (
        <div>
            <h3>{title}</h3>
            <h5>{category}</h5>
            <div>{plot}</div>
            <div>{author}</div>
        </div>
    );
}