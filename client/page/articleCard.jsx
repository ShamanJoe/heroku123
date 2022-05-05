import React from "react";

export function ArticleCard({article: {title, plot, category}}) {
    return (
        <div>
            <h3>{title}</h3>
            <h5>{category}</h5>
            <div>{plot}</div>
        </div>
    );
}