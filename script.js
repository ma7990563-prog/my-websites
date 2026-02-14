
var swiper = new Swiper(".mySwiper", {
      loop:true,  //it means that it never stops and return that 
      navigation: {
        nextEl: "#next",  //now through it the nav icon will move the slider
        prevEl: "#previous",
      },
    });

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list')


// is ka matlab y ha kay jb bhi cartIcon click ho ga to us mn cart-tab-active wali class add ho jay gi//
cartIcon.addEventListener('click',()=> cartTab.classList.add('cart-tab-active'))

//ab cart ko close krnay k liyay//
closeBtn.addEventListener('click',()=> cartTab.classList.remove('cart-tab-active'))

//2nd step//
//first make an empty product list array//
let productList = [];
let cartProduct = [];


//1- create a div in var orderCart
//2- now add ordercard class(alredy formaed)in orderCart(newely form)
//3- in div(orderCart) change the innerHtml to the the code written in html (commented)


const showCarts = ()=>{
  productList.forEach(product =>{
     const orderCart = document.createElement('div');
     orderCart.classList.add('order-card');
     orderCart.innerHTML = `   
      <div class="card-image">
        <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price"> ${product.price}</h4>
      <a href="#" class="btn card-btn"> Add to cart</a>
    `;

    cardList.appendChild(orderCart)
    

    const cardBtn = orderCart.querySelector('.card-btn');
    cardBtn.addEventListener('click',(e)=>{
      e.preventDefault()//prevent page to reload
      //alert('hi')

      addToCart(product)
    })
  })

}

const addToCart =(product)=>{  //product is parameter must be passed otherwise it properties will not be access here
  
  
  //process
  //1-first make a variable(existingProduct)
  //2-used find to find the cartitem
  //3-apply condition (item.id strictly equal to product.id)
  //product id (selected in cart tab)
  //4-if this condition =true
  //5-put if condition
  //6-if its true return the msg(item already exist)

  const existingProduct = cartProduct.find(item => item.id === product.id);
  if(existingProduct){
    alert("item alreaddy in your cart")
    return;
  }
  cartProduct.push(product)

  let quantity=1;
  let price = product.price.replace('$','')
  
  const cartItem = document.createElement('div')
  cartItem.classList.add('item')
  cartItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}">
    </div>
    <div >
      <h4> ${product.name}</h4>
      <h4 class="item-total"> ${product.price}</h4>
            
                                
                                

    </div>
    <div class="flex ">
      <a href="#" class="quantity-btn minus-btn">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="#" class="quantity-btn plus-btn">
        <i class="fa-solid fa-plus"></i>
      </a>
                              
    </div>
  </div>
  `;
  cartList.appendChild(cartItem)

  const plusBtn = cartItem.querySelector(".plus-btn")
  const quantityValue = cartItem.querySelector(".quantity-value")
  const itemTotal = cartItem.querySelector(".item-total")
  const minusBtn = cartItem.querySelector(".minus-btn")
  plusBtn.addEventListener('click',(e)=>{

    e.preventDefault()
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price *quantity).toFixed(2)}`;

  })
  console.log(plusBtn)

  minusBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if (quantity > 1){
    quantity--;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price *quantity).toFixed(2)}`;

    }
    else{
      cartItem.remove();
      cartProduct = cartProduct.filter(item => item.id != product.id);
    }
    
    
  })



}



//first step//
//by this step you have to feth data from json file and then//
//  put it the array (product list ) that you created earlier//
const initApp = ()=>{
  fetch('products.json')
  .then(Response => Response.json())
  .then(data =>{
    productList = data;
    console.log(productList);
    //show carts must be called otherwise it will not work//
    showCarts()
  })

}
initApp()




