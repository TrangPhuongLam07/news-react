import * as cheerio from 'cheerio'
import  request from 'request-promise'

// const cheerio = require('cheerio');

// const request = require('request-promise');

request('https://giaoducthoidai.vn/don-trung-phat-cua-my-eu-nhu-dam-vao-bi-bong-post637055.html', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
        const job = $('body').find('.article .article__title').text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title
        const heading = $('body').find('.article .article__sapo').text();
        console.log(job);
        console.log(heading);
        console.log("OK");

    }else {
        console.log("Error")
        console.log(error);
    }
});