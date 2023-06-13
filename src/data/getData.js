import * as cheerio from 'cheerio'
import  request from 'request-promise'
import React,{useState,useEffect} from "react";

export  function GetData(url) {
    const  [data,setData] = useState([])
    // useEffect(() =>{
        request(url, (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html); // load HTML
                const job = $('body').find('.item-primary .story')
                let items = []

                job.each( (index,el)=>{
                    let heading = $(el).find('.story__heading > a');
                    let title = heading.text()
                    let link = heading.attr('href')
                    let image = $(el).find(".story__thumb").find("img").attr('data-src')
                    let date = $(el).find('.story__time').attr('datetime');
                    let content = $(el).find('.story__summary.story__shorten').text()
                    let splitLink = (link+"").split("/")
                    link = splitLink[splitLink.length - 1];

                    if(image === undefined){
                       image =  $(el).find(".story__thumb").find("img").attr('src')
                    }

                    console.log("Date Data:" + $(el).find('.story__time').attr('datetime'))

                    let item = {
                        id : link,
                        title: title,
                        link: link,
                        content:content,
                        image : (image+"").replace("/220x145",""),
                        date: date
                    }
                    items.push(item);
                    console.log("Education:" + item.image)

                    // console.log(title)
                    // console.log(link)
                    // console.log()
                    // console.log(date)
                    // console.log(content)




                })
                setData(items)

            }else {
                console.log("Error")
                console.log(error);
            }
        })
    // },[])
    return data;
}
