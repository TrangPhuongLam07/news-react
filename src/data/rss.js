import  RSSParser from 'rss-parser'
import Parser from 'html-react-parser';

export let result;

const feedURL = "https://giaoducthoidai.vn/rss/home.rss"
const parser = new RSSParser()
let  article = []

const  parse = async url =>{
    const feed = await parser.parseURL(url);
    feed.items.forEach(item =>{
        article.push( item );
        // console.log(item)
    });
    console.log(feed)
}

await parse(feedURL);


// function splitString(content){
//
//     return "";
// }

result = []
for(var i = 0; i < article.length;i++) {

    let id = article[i].guid.split("/");

    let object = {
        id : id[id.length - 1],
        title: article[i].title,
        link: article[i].link,
        content: article[i].contentSnippet,
        image : Parser(article[i].content)[0].props.children.props.src.toString().replace("/80x80",""),
        date: article[i].pubDate
    }
    result.push(object)
}
console.log(result)
export default result







