'use strict'
import "./style.css";
import {Item, ItemDetailView} from './item.js';

// Use cors.io to bypass the problem of CORS
const url = "https://cors.io/?https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json";
const root = document.getElementById('root');
const itemContainer = document.getElementById('item-container');
const detailView = new ItemDetailView();
detailView.create(root);
let items = [];

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync(url, function(data){
    const json = JSON.parse(data);
    for (let itemInfo in json.groups){
        itemInfo = json.groups[itemInfo];
        let item = new Item(itemInfo.name, 
                            itemInfo.hero.href,
                            itemInfo.priceRange.selling,
                            itemInfo.links.www,
                            itemInfo.messages,
                            itemInfo.images.map(d=>d.href),
                            detailView);
        let div = item.render();
        itemContainer.append(div);
        items.push(div);
    }
})
