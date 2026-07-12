const register_info=document.getElementById("register_info");
const user_info=document.getElementById("user_info");
const user =document.getElementById("name_acc");
const Logout=document.getElementById("Logout");
// hide login and register button
const currentUser=JSON.parse(localStorage.getItem("currentUser"));
if(currentUser){
    register_info.classList.add("hidden");
    user_info.classList.remove("hidden");
    user.innerHTML=`Hello, ${currentUser.Firstname}`
}else{

    register_info.classList.remove("hidden");
    user_info.classList.add("hidden");

}

// Logout
Logout.addEventListener('click',() =>{
    localStorage.removeItem("currentUser");
    setTimeout(()=>{
        window.location.reload();
    },1000)
})
