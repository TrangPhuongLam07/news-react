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
        console.log(item)
    });
    // console.log(article)
}

await parse(feedURL);


// function splitString(content){
//
//     return "";
// }

result = []
for(var i = 0; i < 5;i++) {

    let object = {
        id : article[i].guid,
        title: article[i].title,
        link: article[i].link,
        content: article[i].contentSnippet,
        image : Parser(article[i].content)[0].props.children.props.src.toString().replace("/80x80","")
    }
    result.push(object)
}
console.log(result)
export default result







