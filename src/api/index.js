
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
const headers = new Headers({
    Accept: "application/xml",
    "Content-Type": "application/xml; charset=utf-8",
    //'content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type',
    mode: 'no-cors'
});
export default class API {

    /**
     * @method getRSSFeedDetails static method to fetch rss feed from the url
     * @param {String} RSS_URL to fetch the rss feed from the api
     * @returns {Object} data is an array of objects holding title, description and link
     * @returns {string} error is an error message
     */
    static async getRSSFeedDetails(RSS_URL) {
        let result = { data: [], error: '' };
        let data = await axios
            .get(`https://cors-anywhere.herokuapp.com/${RSS_URL}`, headers)
            .then(function (response) {
                let data = response.data;
                return new window.DOMParser().parseFromString(data, "text/xml")
            })
            .then(data => {
                const items = data.querySelectorAll("item");
                let articleList = [];
                items.forEach((el) => {
                    let article = {
                        title: this.ReplaceCDATA(el.querySelector("title").innerHTML),
                        description: ReactHtmlParser(this.ReplaceCDATA(el.querySelector("description").innerHTML)),
                        link: el.querySelector("link").innerHTML
                    };
                    articleList.push(article);
                });
                result.data = articleList;
                return result;
            })
            .catch(function (error) {
                result.error = error.message;
                return result;
            });

        return data;
    }

    /**
     * @method ReplaceCDATA is to remove the CDATA from the string using replace function
     * @param {String} content 
     * @returns {String} content without CDATA
     */
    static ReplaceCDATA(content) {
        return content.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
    }
}
