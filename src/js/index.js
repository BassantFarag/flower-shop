const flowers_container_section=document.getElementById("flowers_container");
flowers_container_section.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("fa-heart")){
        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("text-red-700");
    }
})

fetch("data/flowers.json")
.then((resopnse) => resopnse.json())
.then((data) =>{
    data.forEach((item) => {
        const card =document.createElement("div");
        card.innerHTML=`
        <div class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img src="images/${item.image}" alt="Red Rose" class="w-full h-64 object-cover">

            <div class="p-5 relative">
                <h2 class="text-xl font-semibold text-gray-800">
                    ${item.name}
                </h2>
                
                <button class="favorite-btn absolute top-6 right-5 cur ">
                    <i class="fa-regular fa-heart  text-xl" ></i>
                </button>
                   
                
                <p class="text-sm text-gray-500 mt-1">
                    ${item.category}
                </p>

               <div class="flex items-center justify-between mt-5">
                    <span class="text-xl font-bold text-[#BD868C]">
                        $${item.price}
                    </span>
                    <button
                        class="bg-[#BD868C] hover:bg-[#A86D73] text-white px-4 py-2 rounded-xl transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>`
        
        flowers_container_section.appendChild(card)
    })
})
