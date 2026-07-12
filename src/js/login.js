const emailInput =document.getElementById("email");
const passward =document.getElementById("password");
const LoginForm =document.querySelector("form");

LoginForm.addEventListener('submit',(e) =>{
    e.preventDefault();
     const emailValue=emailInput.value.trim();
    const passwardValue=passward.value.trim();
     if(emailValue==="" || passwardValue===""){
         showNotification("Please fill in all fields!","error");
         return;
    }

    let usersList=JSON.parse(localStorage.getItem("allusers"));
    const foundUser=usersList.find((user) => user.email==emailValue)

    if(!foundUser){
        showNotification("this email don'y exist! pleaase register first .","error");
    }else if(foundUser.passward!==passwardValue){
        showNotification("incorrect password ! try again ","error");
    }else{
        localStorage.setItem("currentUser",JSON.stringify(foundUser))
         showNotification("Registration successful! Redirecting...", "success");
        setTimeout(()=>{
            alert("🌸 Welcome back to Fleura!");
            window.location.href="index.html"
        },1000)
    }
    

   
})

function showNotification(message ,type){
    const message_div=document.createElement("div");
    message_div.innerHTML=message;
    message_div.className=`fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 z-50 opacity-0 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 translate-y-10 `
    document.body.appendChild(message_div);
    if(type==="error"){
        message_div.classList.add("bg-[#6E3B43]");
    }else{
        message_div.classList.add("bg-teal-900");
    }

    setTimeout(()=>{
        message_div.classList.remove("translate-y-10" ,"opacity-0");

    },100);

    setTimeout(()=>{
     message_div.classList.add("translate-y-10","opacity-0");
     setTimeout(()=>{
         message_div.remove();
     },300)
 },2500)
}