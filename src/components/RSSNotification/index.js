import React from "react";
import useRSSFeed from "../../hooks/useRSSFeed";
/**
 * @function RSSNotification to display the error message
 * @const getErrorMessage to close the error message after 5 seconds 
 */
export default function RSSNotification() {
    const { error, removeError } = useRSSFeed();
    const getErrorMessage = (message) => {
        setTimeout(function () {
            removeError();
        }, 5000);
        return message;
    };
    return (
        <div className="notification">
            {error && error.message && (
                <span>{getErrorMessage(error.message)}</span>
            )}
        </div>
    );
}
