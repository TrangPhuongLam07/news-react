import  RSSParser from 'rss-parser'
import Parser from 'html-react-parser';


let data;

const feedURL = "https://giaoducthudo.giaoducthoidai.vn/rss/trang-chu"
const parser = new RSSParser()
let  article = []

const  parse = async url =>{
    const feed = await parser.parseURL(url);
    feed.items.forEach(item =>{
        article.push( item );
        console.log(item)
    });
    console.log("Hoc duong:"+ feed)
}

await parse(feedURL);


data = []
for(let i = 0; i < article.length;i++) {

    let id = article[i].guid.split("/");
    let image = "" ;
    try {
        image = Parser(article[i].content)[0].props.children.props.src.toString().replace("/80x80","")
    }catch {
        image = "Lỗi Ảnh"
    }

    let object = {
        id : id[id.length - 1],
        title: article[i].title,
        link: article[i].link,
        content: article[i].contentSnippet,
        image : image,
        date: article[i].pubDate
    }
    data.push(object)
}

export default data