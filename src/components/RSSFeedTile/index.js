import React from 'react';

export default function NewsFeedTile(props) {
    const { title, description, link } = props.article;
    return (
        <div className="slide">
            <h4>{title}</h4>
            <div>{description}<a target="_blank" href={link} rel="noopener noreferrer">View More</a></div>
        </div>
    );
}