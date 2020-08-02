import React, { useState } from 'react';
import useRSSFeed from '../../hooks/useRSSFeed';
import API from "../../api";

export default function Search() {
    const { addError, removeError, updateRSSFeed } = useRSSFeed();
    const [url, setURL] = useState("");

    /**
     * @const fetchRSSFeed to fetch rss feed from the given url
     */
    const fetchRSSFeed = async () => {
        try {
            if (url) {
                const result = await API.getRSSFeedDetails(url);
                updateRSSFeed(result.data);
                if (result.data.length === 0) {
                    addError("No Result", null);
                }
                else if (result.error !== '') {
                    addError(result.error, null);
                } else {
                    removeError();
                }
            } else { addError('Enter URL to fetch the rss feed.', null) }
        } catch (err) {
            addError(`LOAD_DATA_ERROR: ${err}`, err.response);
        }
    };

    /**
     * @param {Object} event event handler for form submit 
     */
    const mySubmitHandler = (event) => {
        event.preventDefault();
        fetchRSSFeed();
    }
    const search = (event) => {
        if (event.key === "Enter") {
            fetchRSSFeed();
            event.preventDefault();
        }
    };

    return (
        <div>
            <form onSubmit={(e) => mySubmitHandler(e)}>
                <input className="search"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setURL(e.target.value)}
                    value={url}
                    onKeyPress={search}
                    onKeyDown={search}
                ></input>
                <button type="submit" className="btn-search">SUBMIT</button>
            </form>
        </div>
    );
}