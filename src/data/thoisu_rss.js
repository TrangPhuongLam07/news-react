const RSSParser = require('rss-parser')
const Parser = require('html-react-parser')
export let data;

const feedURL = "https://giaoducthoidai.vn/rss/thoi-su-1.rss"
const parser = new RSSParser()
let  article = []

const  parse = async url =>{
    const feed = await parser.parseURL(url);
    feed.items.forEach(item =>{
        article.push( item );
    });
    console.log(feed)
}

await parse(feedURL);


data = []

//xử lý feeds lấy ra attributes cần thiết
for(let i = 0; i < article.length;i++) {

    let id = article[i].guid.split("/");
    let image = "" ;
    //xử lý ảnh khi fetching
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

export default data;
