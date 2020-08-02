import React, { useState, useCallback } from "react";

export const RSSFeedContext = React.createContext({
    error: null,
    currentPage: 1,
    rssFeedList: [],
    addError: () => { },
    removeError: () => { },
    updateRSSFeed: () => { },
    setCurrentPage: () => { }
});

export default function RSSFeedProvider({ children }) {
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rssFeedList, setRSSFeedList] = useState([]);

    const removeError = () => setError(null);
    const updateRSSFeed = (newsfeed) => { setRSSFeedList(newsfeed); setCurrentPage(1); };
    const addError = (message, status) => setError({ message, status });

    const contextValue = {
        error,
        currentPage,
        rssFeedList,
        addError: useCallback((message, status) => addError(message, status), []),
        removeError: useCallback(() => removeError(), []),
        updateRSSFeed: useCallback((newsfeed) => updateRSSFeed(newsfeed), []),
        setCurrentPage: useCallback((pgno) => setCurrentPage(pgno), []),
    };

    return (
        <RSSFeedContext.Provider value={contextValue}>
            {children}
        </RSSFeedContext.Provider>
    );
}
