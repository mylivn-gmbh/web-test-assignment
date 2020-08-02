import React, { useState } from 'react';
import useRSSFeed from '../../hooks/useRSSFeed';
import Search from "../Search";
import RSSFeedTile from '../RSSFeedTile';
import '../../common/util/Extensions';

export default function HomePage() {
    const { rssFeedList, currentPage, setCurrentPage } = useRSSFeed();

    /**
     * @const rederList is to render the rss feed list on DOM
     */
    const renderList = () => {
        let articles = [];
        let pgNo = 0;
        let count = rssFeedList.length;

        /* I am using my own version of Array.prototype.map */
        articles = rssFeedList.myMap((item, i) => {
            pgNo = pgNo + 1;
            return (
                <React.Fragment>
                    <a key={(count + pgNo)}
                        className={isLinkActive(pgNo) ? pgNo === currentPage ? "navigation selected" : "navigation" : "navigation disabled"}
                        onClick={(e) => handlePaginationClick(e)}>{pgNo}</a>
                    <RSSFeedTile key={pgNo} article={item} />
                </React.Fragment>
            );
        });

        if (count > 1) {
            articles.unshift(
                <a key={0} className={currentPage > 1 ? "navigation" : "navigation disabled"}
                    onClick={(e) => { setCurrentPage(currentPage - 1); }}>{"<"}</a>);
            articles.push(
                <a key={(count + count + 1)} className={currentPage < rssFeedList.length ? "navigation" : "navigation disabled"}
                    onClick={(e) => { setCurrentPage(currentPage + 1); }}>{">"}</a>);
        }
        return articles;
    };

    const handlePaginationClick = (eve) => {
        try { setCurrentPage(parseInt(eve.target.innerText)); } catch (err) { }
    };

    /**
     * @const isLinkActive is to verify whether the page number link to should be visible or not
     * @param {Number} pgNo navigation link number
     * @returns {Boolean} true/false 
     */
    const isLinkActive = (pgNo) => {
        let isActive = true;
        if (rssFeedList.length > 10) {
            if (pgNo !== currentPage) {
                let minPage = 0; let maxPage = 0;
                let itemsCount = rssFeedList.length;
                if (currentPage - 4 <= 1) { minPage = 1; maxPage = 10; }
                else if (currentPage + 5 > itemsCount) { minPage = itemsCount - 9; maxPage = itemsCount; }
                else { minPage = currentPage - 4; maxPage = currentPage + 5; }
                if (pgNo < minPage || pgNo > maxPage) isActive = false;
            }
        }
        return isActive;
    };
    return (
        <React.Fragment>
            <Search />
            <div className="container">
                <div className="article-slider">
                    {renderList()}
                </div>
            </div>
        </React.Fragment>
    );
}