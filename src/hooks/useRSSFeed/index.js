import { useContext } from "react";
import { RSSFeedContext } from "../../providers/RSSFeedProvider";


function useRSSFeed() {
    const {
        error,
        currentPage,
        rssFeedList,
        updateRSSFeed,
        addError,
        removeError,
        setCurrentPage
    } = useContext(RSSFeedContext);
    return { error, currentPage, rssFeedList, updateRSSFeed, addError, removeError, setCurrentPage };
}
export default useRSSFeed;
