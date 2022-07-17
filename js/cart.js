let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');




let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
  
  calculation();

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


let generatCartItems = () =>{
    if(basket.length !==0){
        return (ShoppingCart.innerHTML = basket.map((x) =>{
            let {id,item} =x;
            let search = shopItemsData.find((y)=>y.id ===id) || [];
        return`
            <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
        <div class="details">

        <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price"> ${search.price} K.D</p>
              </h4>
              <i onclick="removeItem(${id})" class="fa fa-times"></i>
          </div>
          <div class="buttons-">
          <i onclick="decrement(${id})" class="fa fa-minus"></i>
          <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="fa fa-plus"></i>
          </div>
          <div class="total"><h3>Total price:<span> ${item * search.price} K.D</span></h3></div>

        </div>
        </div>
        `;
        }).join(''))
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty!</h2>
        <a href="3menu.html">
          <button class="HomeBtn">Add Items</button>
        </a>
        `;
      }
};

generatCartItems();

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

generatCartItems();
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
    generatCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};

// update
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
calculation();
TotalAmount();
};

let removeItem=(id)=>{
    let selectedItem = id;
    basket=basket.filter((x)=>x.id !== selectedItem.id);
    generatCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generatCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };

let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
     
      label.innerHTML = `
      <h2>Total Bill : ${amount} K.D</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();