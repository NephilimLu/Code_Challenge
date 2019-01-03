class ItemDetailView{
    constructor(){
        this.id = "item-detail-view"
        this.index = 0;
        this.maskId = "mask";
        this.size = 0;
    }

    _getElement(){
        return document.getElementById(this.id);
    }

    _getMask(){
        return document.getElementById(this.maskId);
    }

    create(body) {
        let div = document.createElement('div');
        div.id = this.id;
        body.append(div);
        let mask = document.createElement('div');
        mask.id = this.maskId;
        body.append(mask);
        mask.addEventListener('click', e=>{
            mask.style['opacity'] = 0;
            setTimeout(()=>{
                this.hide();
            }, 100);
        })
    }

    display(){
        this._getMask().style['display'] = 'block'
        mask.style['opacity'] = 0.4;
        setTimeout(()=>{
            this._getElement().style['display'] = 'block'
        }, 200);
    }

    hide(){
        this._getElement().style['display'] = 'none'
        this._getMask().style['display'] = 'none'
    }

    displayItem(index=0){
        this.index = index;
        let div = this._getElement();
        let images = div.getElementsByClassName("detail-thumbnails");
        let dots = div.getElementsByClassName("dot");
        for (let i = 0; i < images.length; i++){
            if (i == index){
                images[i].classList.add('show');
                dots[i].classList.add('show-dot');
            } else {
                images[i].classList.remove('show');
                dots[i].classList.remove('show-dot');
            }
        }
    }

    displayDirection(direction){
        let newIndex = (this.index + direction + this.size) % this.size;
        this.displayItem(newIndex);
    }

    render(imagesUrls, name){
        let div = this._getElement();
        let h3 = div.getElementsByTagName('h3');
        if (h3.length === 0){
            h3 = document.createElement("h3");
            div.append(h3)
            let ul = document.createElement('ul');
            div.append(ul);

            // arrow
            let right = document.createElement('i');
            right.id = "right-arrow";
            right.classList.add("fas");
            right.classList.add("fa-chevron-right");
            right.addEventListener('click', event=>this.displayDirection(1));
            div.append(right);
            let left = document.createElement('i');
            left.id = "left-arrow";
            left.classList.add("fas");
            left.classList.add("fa-chevron-left");
            left.addEventListener('click', event=>this.displayDirection(-1));
            div.append(left);
            
            // thumbnails and dots
            this.size = imagesUrls.length;
            for (let i = 0; i < imagesUrls.length; i++){
                let newThumbnail = document.createElement('div');
                newThumbnail.classList.add("detail-thumbnails");
                div.append(newThumbnail);

                let li = document.createElement('li');
                li.classList.add("dot");
                let index = i;
                li.addEventListener("click", event=>this.displayItem(index))
                ul.append(li);

            }
        }

        h3.innerText = name;
        const thumbnails = div.getElementsByClassName('detail-thumbnails');
        for (let i = 0; i < imagesUrls.length; i++){
            thumbnails[i].style['background-image'] = 'url(' + imagesUrls[i] + ')';
        }

        this.displayItem(this.index);
    }
}


class Item {
    constructor(name, hero, price, url, message, thumbnails, detailView){
        this.name = name.replace("&#8482;", "");;
        this.hero = hero;
        this.price = price;
        this.url = url;
        this.message = message;
        this.thumbnails = thumbnails;
        this.detailView = detailView;
    }

    render(){
        let div = document.createElement('div');
        div.title = this.name;
        div.classList.add("item");
        div.classList.add("col");
        div.classList.add("col-lg-3");
        div.classList.add("col-md-4");
        div.classList.add("col-sm-6");
        div.classList.add("col-12");
        let img = document.createElement('img');
        img.src = this.hero;
        div.append(img);

        let title = document.createElement('div');
        title.classList.add("item-name");
        title.innerHTML = this.name;
        div.append(title);
        let price = document.createElement('div');
        price.classList.add("item-price");
        price.innerText = `$${this.price.low} - $${this.price.high}`;
        div.append(price);

        div.addEventListener('click', event=>{
            console.log(this);
            console.log(this.detailView);
            this.detailView.render(this.thumbnails, this.name);
            this.detailView.display();
        })
        return div;
    }
}


export {Item, ItemDetailView};
