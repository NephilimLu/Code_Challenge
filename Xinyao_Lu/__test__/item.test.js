import {Item, ItemDetailView} from '../src/item';
import * as fs from "fs";
import {JSDOM} from 'jsdom';
let html = fs.readFileSync(`${__dirname}/../src/main.html`, 'utf8');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf8');
const json = JSON.parse(data);
const dom = new JSDOM(html);
const window = dom.window;
const doc = window.document;
global.document = doc;


test('Item render unit test', ()=>{
    let item = new Item("name",
                        "http://hero.com/jpg.jpg",
                        {low: 100, high: 200},
                        "url",
                        ["message"],
                        ['thumbnail1', 'thumbnail2', 'thumbnail3'],
                        null);
    let div = item.render();
    let img = div.getElementsByTagName("img");
    expect(img.length).toBe(1);
    expect(img[0].src).toBe('http://hero.com/jpg.jpg');
    expect(div.title).toBe("name");

    let name = div.getElementsByClassName('item-name')[0];
    expect(name.innerHTML).toBe('name');

    let price = div.getElementsByClassName('item-price')[0];
    expect(price.innerText.toString().includes('100')).toBe(true);
    expect(price.innerText.toString().includes('200')).toBe(true);
})


test('ItemDetailView render unit test', done => {
    let detailView = new ItemDetailView();
    const body = document.body;
    detailView.create(body);
    let viewDiv = document.getElementById(detailView.id);
    let maskDiv = document.getElementById(detailView.maskId);
    expect(viewDiv).not.toBe(null);
    expect(maskDiv).not.toBe(null);
    detailView.render(
        [
            'http://image.com/image1.jpg',
            'http://image.com/image2.jpg',
            'http://image.com/image3.jpg',
            'http://image.com/image4.jpg',
        ],
        "name");
    // 4 thumbnails in this case
    expect(viewDiv.getElementsByTagName('li').length).toEqual(4);
    // two arrow
    let arrows = viewDiv.getElementsByTagName('i');
    expect(arrows.length).toEqual(2);
    expect(viewDiv.getElementsByTagName('h3')[0].innerText).toEqual('name');
    detailView.hide();
    expect(viewDiv.style['display']).toEqual('none');
    expect(maskDiv.style['display']).toEqual('none');
    detailView.display();
    setTimeout(() => {
        expect(viewDiv.style['display']).not.toEqual('none');
        expect(maskDiv.style['display']).not.toEqual('none');
        done();
    }, 300);
})