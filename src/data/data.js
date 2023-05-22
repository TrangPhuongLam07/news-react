import React, { useState, useEffect } from 'react';
import rssParser from 'rss-parser';

// eslint-disable-next-line react-hooks/rules-of-hooks
const [feed, setFeed] = useState(null);
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
    async function fetchData() {
        const response = await fetch(
            "https://www.sciencedaily.com/rss/earth_climate/environmental_issues.xml"
        )
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                // console.log(rss.items);
                setFeed(rss.items);
            });
    }
    fetchData();
}, []);

console.log(feed)