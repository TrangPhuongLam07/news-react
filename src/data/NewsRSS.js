import RSSParser from 'rss-parser'
import Parser from 'html-react-parser';

let result = [];
let listFeedURL = ["https://giaoducthoidai.vn/rss/home.rss", "https://giaoducthoidai.vn/rss/phap-luat-phap-luat-8.rss"
    , "https://giaoducthoidai.vn/rss/ket-noi-2.rss", "https://giaoducthoidai.vn/rss/trao-doi-3.rss",
    "https://giaoducthoidai.vn/rss/nhan-ai-13.rss", "https://giaoducthoidai.vn/rss/video-media-14.rss"]
let feedURL = listFeedURL[0];
const parser = new RSSParser();
let article = []
/*console.log("1----")*/


async function parse(url) {

    console.log("3----")
    const feed = await parser.parseURL(url);
    feed.items.forEach(item => {
        article.push(item);
    });
    findNews();
  /*  console.log("Feed: "+feed)
    console.log("size: "+article.length)
*/

}
function findNews() {
    console.log("findNews()------")
    for (var i = 0; i < article.length; i++) {

        let id = article[i].guid.split("/");
        let image = "";
        try {
            image = Parser(article[i].content)[0].props.children.props.src.toString().replace("/80x80", "")
        } catch {
            image = "Lỗi Ảnh"
        }

        let object = {
            id: id[id.length - 1],
            title: article[i].title,
            link: article[i].link,
            content: article[i].contentSnippet,
            image: image,
            date: article[i].pubDate
        }
        result.push(object)
    }
    /*console.log("Result: " + result)*/


}

export  function  getNews(url) {

    console.log("2----")
   /* if(nameEntry.localeCompare("phap-luat")===0) parse(listFeedURL[1]).then(() => {console.log("Run Parser phap luat----")});
    else if(nameEntry.localeCompare("ket-noi")===0) parse(listFeedURL[2]).then(() => {console.log("Run Parser ket noi----")});
    else if(nameEntry.localeCompare("trao-doi")===0) parse(listFeedURL[3]).then(() => {console.log("Run Parser trao doi----")});
    else if(nameEntry.localeCompare("nhan-ai")===0) parse(listFeedURL[4]).then(() => {console.log("Run Parser nhan ai----")});
    else if(nameEntry.localeCompare("media")===0) parse(listFeedURL[5]).then(() => {console.log("Run Parser media----")});
    else parse(listFeedURL[0]).then(() => {console.log("Run Parser home----")});*/
    parse(url).then(() => {console.log("NewRSS----")});
    return result;
}
















