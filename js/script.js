let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

// shopping cart

let shop = document.getElementById("container");

console.log(container);

let shopItemsData = [
    {id:"innamon",
    name:"Cinnamon Tea",
    price:"1.250",
    img:"./asssets/images/menu-c.png",},

    {id:"Chamomile",
    name:"Chamomile Tea",
    price:"1.250",
    img:"./asssets/images/menu-cht.png",},
    
    {id:"Ginger",
    name:"Ginger Tea",
    price:"1.250",
    img:"./asssets/images/menu-g.jpg",},
    
    {id:"Green",
    name:"Green Tea",
    price:"1.000",
    img:"./asssets/images/menu-green.jpg",},
    
    {id:"Hibiscu",
    name:"Hibiscus tea",
    price:"1.250",
    img:"./asssets/images/menu-h.jpg",},
    
    {id:"Black",
    name:"Black Tea",
    price:"1.000",
    img:"./asssets/images/BLACK-TEA.jpg",}
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =()=>{
    return (shop.innerHTML=shopItemsData.map((x)=>{
        let{id,name,price,img}=x;
        let search =basket.find((x) => x.id === id) || [];
        return `     
        <div id=product-id-${id} class="box">
            <img src=${img} alt="cinnamon">
            <h3>${name}</h3>
            <div class="price">${price} K.D</div>
            
            <div class="buttons">
                <i onclick="decrement(${id})" class="fa fa-minus"></i>
                <div id=${id} class=" quantity">
                ${search.item === undefined? 0: search.item}
                </div>
                <i onclick="increment(${id})" class="fa fa-plus"></i>
            </div>
         </div>   `;
    }).join(""));
};

generateshop();

// increment
let increment = (id) => {
    let selectedItem = id;
let search = basket.find((x)=> x.id === selectedItem.id)

if(search === undefined){
    basket.push({
       id:selectedItem.id,
       item:1,
    });
}
else{
    search.item += 1;
}


update(selectedItem.id);

localStorage.setItem("data",JSON.stringify(basket));
};

// decrement
let decrement = (id)=>{
    let selectedItem =id;
    let search = basket.find((x)=> x.id === selectedItem.id)
    
    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem("data",JSON.stringify(basket));
};


// update
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
calculation();
};

// calculate total
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
  
  calculation();