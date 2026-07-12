
//fetch data
// Show Data
let flowers =[]
async function init(){
    const response = await fetch("data/flowers.json");
   flowers =await response.json();
    // localStorage.setItem("flowers" ,JSON.stringify(flowers));
     flowers.forEach((item) => {
        const card =document.createElement("div");
        card.innerHTML=`
        <div class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img src="images/${item.image}" alt="Red Rose" class="w-full h-64 object-cover">

            <div class="p-5 relative">
                <h2 class="text-xl font-semibold text-gray-800">
                    ${item.name}
                </h2>
                
                <button class="favorite-btn absolute top-6 right-5 cur ">
                    <i
                    id="heart-${item.id}"
                     class="fa-regular fa-heart  text-xl" 
                     onclick="toggleFavorite(${item.id})"
                     ></i>
                </button>
                   
                
                <p class="text-sm text-gray-500 mt-1">
                    ${item.category}
                </p>

               <div class="flex items-center justify-between mt-5">
                    <span class="text-xl font-bold text-[#BD868C]">
                        $${item.price}
                    </span>
                    <button
                        id="btn-${item.id}"
                        class="addToCart bg-[#BD868C] hover:bg-[#A86D73] text-white px-4 py-2 rounded-xl transition" 
                        onClick="toggleCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>`
        
        flowers_container_section.appendChild(card)
    })
    updateButton();
    updateFavoriteIcon();
}
init();


const goTocartPagebtn=document.getElementById("ViewCart");
goTocartPagebtn.addEventListener('click' ,()=>{
    window.location.href="cart.html"
})

// increase cart 
let selected_items=JSON.parse(localStorage.getItem("flowersInCart")) || [];
const budge =document.getElementById("budge");
function updateBadge(){
    const totalNumberOfItem=selected_items.reduce((total , item)=>{
        return total+item.quantity
    },0);

    budge.innerHTML=totalNumberOfItem;
}

function updateButton(){
    flowers.forEach((flower) => {
        const btn = document.getElementById(`btn-${flower.id}`);
        if (!btn) return;

        const existInCart=selected_items.find((item) => item.id === flower.id);
        if(existInCart){
            btn.textContent = "Remove from Cart";
            btn.classList.remove(
                "bg-[#BD868C]",
                "hover:bg-[#A86D73]"
            );
            btn.classList.add(
                "bg-red-800",
                "hover:bg-red-900"
            );
        }
        else{
            btn.textContent = "Add to Cart";
            btn.classList.remove(
                "bg-red-800",
                "hover:bg-red-900"
            );
            btn.classList.add(
                "bg-[#BD868C]",
                "hover:bg-[#A86D73]"
            );

        }
    });
}


updateBadge();
//add to cart
const cart_icon=document.getElementById("cart");
// const addToCart =document.querySelector


function addToCart(id){
    if(localStorage.getItem("currentUser")){
        // let flowersItem=JSON.parse(localStorage.getItem("flowers"));
        let choosenItem=flowers.find((item) => item.id === id);
        let existItem=selected_items.find((item) => item.id===id)
        if(existItem){
            existItem.quantity++;
        }
        else{
            selected_items.push({
                ...choosenItem,
                quantity:1
            })
        }
        localStorage.setItem("flowersInCart",JSON.stringify(selected_items));
        updateBadge();
        DrawCartProduct();
   
    }else{
        window.location.href="login.html"
    }
}
function toggleCart(id){
    let existItem = selected_items.find(item => item.id === id);
    if(existItem){
        selected_items=selected_items.filter(item => item.id !==id);
        localStorage.setItem(
            "flowersInCart",
            JSON.stringify(selected_items)
        );
        updateBadge();
        DrawCartProduct();
        updateButton()
    }else{
        addToCart(id);
        updateButton()
        updateBadge();
        DrawCartProduct();
        
    }
}


// Draw cart item 
const choosenItemList=document.getElementById("mini_Cart");
const cart_items=document.getElementById("cart_items");
const overlay=document.getElementById("overlay");
let isOpen = false;

function openCart() {

    choosenItemList.classList.remove("opacity-0", "scale-95", "invisible");
    choosenItemList.classList.add("opacity-100", "scale-100");

    overlay.classList.remove("hidden");

    isOpen = true;
}

function closeCart() {
    choosenItemList.classList.remove("opacity-100", "scale-100");
    choosenItemList.classList.add("opacity-0", "scale-95", "invisible");

    overlay.classList.add("hidden");

    isOpen = false;
}

function DrawCartItems() {
    if (isOpen) {
        closeCart();
    } else {
        openCart();
    }
}
const TotalPrice=document.getElementById("totalPrice");
function calcPrice(){
    let totalPrice=selected_items.reduce((total , item) =>{
        return total+(item.price*item.quantity)
    },0)

    TotalPrice.innerHTML=`$${totalPrice}`
}

// Draw the mini cart
 function DrawCartProduct(){
    cart_items.innerHTML=""
    
    selected_items.forEach((item) => {
        const cardItem= document.createElement("div")
        cardItem.innerHTML+=`<div class="flex justify-between py-4 border-b-1 border-[#E6D6D8]/70  pb-3  ">
                                    <div class="flex flex-col justify-center mt-4">
                                        <div class="flex gap-1 relative">
                                                <span class="flex justify-center items-center size-7 rounded-lg bg-[#BD868C] text-white cursor-pointer" onClick="addItem(${item.id})">+</span>
                                                <span class="count size-4 text-xl pt-2 text-white flex justify-center items-center">${item.quantity}</span>
                                                <span class="subtruct size-7 bg-white text-[#BD868C] flex justify-center items-center rounded-lg cursor-pointer" onClick="subtructItem(${item.id})">-</span>
                                        </div>
                                        <div><i
                                         class="fa-regular fa-trash-can text-[#BD868C] size-7 ml-8 cursor-pointer" onClick="deleteAll_from_mini_cart(${item.id})"></i></div>
                                    </div>
                                    <div class="flex gap-2 ">
                                        <div class="flex flex-col justify-center items-end font-sans ">
                                            <h2 class="text-mauve-100 text-lg">${item.name}</h2>
                                            <h2 class="text-mauve-400 ">$${item.quantity * item.price}</h2>
                                        </div>
                                        <img src="images/${item.image}" alt="image product" class="w-16 h-16 rounded-xl ">
                                    </div> 
                                </div>`

        cart_items.appendChild(cardItem);
        calcPrice();                    
    })

 }
 DrawCartProduct();

 //functions on mini cart products
 function deleteAll_from_mini_cart(id){
    selected_items = selected_items.filter(item => item.id !== id);

    localStorage.setItem(
        "flowersInCart",
        JSON.stringify(selected_items)
    );

    DrawCartProduct();

    updateBadge()
    updateButton()
 }  
function addItem(id){
    let addone=selected_items.find((item) => item.id===id);
    addone.quantity++;
     localStorage.setItem(
        "flowersInCart",
        JSON.stringify(selected_items)
    );
    updateBadge()
    DrawCartProduct();
}
function subtructItem(id){
   let subtructone=selected_items.find((item) => item.id===id);
    if(subtructone.quantity>1){
        
       subtructone.quantity--;
       localStorage.setItem(
        "flowersInCart",
        JSON.stringify(selected_items)
    );

    DrawCartProduct();

    updateBadge()

    }else{
        deleteAll_from_mini_cart(id)
    }

   
}


//favorite

const flowers_container_section=document.getElementById("flowers_container");



let favoriteList =JSON.parse(localStorage.getItem("favoriteItems")) || [];
function toggleFavorite(id){
    const existInFav=favoriteList.find(item => item.id === id);
    if(existInFav){
        //remove from fav 
        favoriteList=favoriteList.filter(item => item.id !== id);
        localStorage.setItem("favoriteItems" , JSON.stringify(favoriteList));
    }else{
        let flowerFav=flowers.find((item) => item.id ===id);
        favoriteList.push(flowerFav);
        localStorage.setItem("favoriteItems" , JSON.stringify(favoriteList));
    }

    updateFavoriteIcon();
}

function updateFavoriteIcon(){
    flowers.forEach((flower) => {
        const heart = document.getElementById(`heart-${flower.id}`);
        if (!heart) return;

        const exist = favoriteList.find(item => item.id === flower.id);

        if (exist) {

            heart.classList.remove("fa-regular");
            heart.classList.add("fa-solid", "text-red-700");

        } else {

            heart.classList.remove("fa-solid", "text-red-700");
            heart.classList.add("fa-regular");
        }

    });
    }
