

 let cartItems = JSON.parse(localStorage.getItem("flowersInCart")) || [];
const ParentDiv=document.getElementById("ParentDiv");
function DrawCartPage(){
    ParentDiv.innerHTML = "";
    cartItems.forEach((item) => {
        
        const card =document.createElement("div");
        card.innerHTML=`
         <div class="flex gap-5 border border-[#F0E4E6] hover:-translate-y-2 duration-300 transition  px-6 py-3 rounded-2xl shadow-md hover:border-[#BD868C] hover:shadow-xl transition duration-300">
            <div class="py-4 overflow-hidden rounded-2xl">
             <img src="images/${item.image}" class="w-28 h-28 rounded-2xl object-cover shadow hover:scale-110 transition duration-300">
            </div>
            <div class="flex flex-col justify-between flex-1">
            <div>
                <h2 class="text-2xl font-semibold text-[#6E3B43]">${item.name}</h2>
                <p class="text-gray-500 mt-1">
                    Category :
                    <span class="text-[#BD868C]">${item.category}</span>
                </p>
                <p class="text-gray-500 mt-1">
                    Price :
                    <span class="text-[#BD868C]">$${item.price * item.quantity}</span>
                </p>
            </div>

            <div class="flex justify-between items-center mt-3">
                <div class="flex items-center bg-[#F9F1F2] rounded-lg overflow-hidden">
                    <span class="size-8 flex justify-center items-center bg-[#BD868C] text-white cursor-pointer" onCLick="SubtractItem(${item.id})">-</span>
                    <span class="size-8 text-lg flex justify-center items-center">${item.quantity}</span>
                    <span class="size-8 flex justify-center items-center bg-[#BD868C] text-white cursor-pointer" onCLick="addItem(${item.id})">+</span>
                </div>
                <button class="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-4 py-2 rounded-xl transition flex gap-2 items-center"
                onClick="RemoveItem(${item.id})">
                    <i class="fa-regular fa-trash-can"></i> Remove
                </button>
            </div>
    </div>
</div>
        `

    ParentDiv.appendChild(card)    

    });
}
DrawCartPage();

function addItem(id){
    let choosenItem=cartItems.find((item) => item.id ===id);
    choosenItem.quantity++;
    localStorage.setItem("flowersInCart",JSON.stringify(cartItems));

    DrawCartPage();
}
function RemoveItem(id){
   
     cartItems=cartItems.filter((item) => item.id!==id);
     localStorage.setItem("flowersInCart",JSON.stringify(cartItems));
    DrawCartPage();
}
function SubtractItem(id){
    let choosenItem=cartItems.find((item) => item.id ===id);
    if(choosenItem.quantity>1){
        choosenItem.quantity--;
    localStorage.setItem("flowersInCart",JSON.stringify(cartItems));

      DrawCartPage();
    }else{
        RemoveItem(id)
    }
    
}

// ////////////////////////////////////////////Favorite section////////////////////////////////////////////
let favoriteItems =JSON.parse(localStorage.getItem("favoriteItems")) || [];
const ParentFavItems=document.getElementById("ParentFavItems");
function DrawFavoriteItems(){
    ParentFavItems.innerHTML = "";
    favoriteItems.forEach((item) =>{
        const card=document.createElement("div");
        card.innerHTML=`
            <div class="flex flex-col items-center w-60 mx-auto  hover:-translate-y-2 duration-300 transition hover:shadow-b-2xl rounded-2xl">
                <!-- Arch shaped image container -->
                <div class="w-full h-72 bg-[#F3D9DC] rounded-t-[999px] overflow-hidden flex items-end justify-center relative">
                    <img src="images/${item.image}" class="w-full h-full object-cover">
                </div>

                <!-- Info section below the arch -->
                <div class="w-full bg-white rounded-b-2xl shadow-md px-5 py-4 text-center -mt-1">
                    <p class="uppercase tracking-[3px] text-xs text-gray-400 mb-2">${item.category}</p>
                    <h3 class="text-xl font-semibold text-[#6E3B43]">${item.name}</h3>
                    <p class="text-gray-500 mt-1">
                        <span class="text-[#BD868C]">$${item.price}</span>
                    </p>
                    <button class="mt-3 flex items-center justify-center gap-2 mx-auto bg-[#BD868C] hover:bg-[#a86e75] text-white px-4 py-2 rounded-xl transition" 
                    onClick="RemoveFromFav(${item.id})">
                       <i class="fa-brands fa-gratipay"></i>
        
                    </button>
                </div>
             </div>
        `
        ParentFavItems.appendChild(card)
    })
}

 DrawFavoriteItems();


 function RemoveFromFav(id){
    favoriteItems=favoriteItems.filter(item => item.id !== id);
    localStorage.setItem("favoriteItems" , JSON.stringify(favoriteItems));
     DrawFavoriteItems();
 }