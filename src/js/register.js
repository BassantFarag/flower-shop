const registerForm =document.querySelector("form");
const firstNameInput=document.getElementById("first_name");
const lastNameInput=document.getElementById("last_name");
const emailInput =document.getElementById("email");
const passward =document.getElementById("password");

registerForm.addEventListener('submit' ,(e) => {
    e.preventDefault();

    const firstNameValue=firstNameInput.value.trim();
    const lastNameValue=lastNameInput.value.trim();
    const emailValue=emailInput.value.trim();
    const passwardValue=passward.value.trim();

    if(firstNameValue==="" || lastNameValue==="" || emailValue==="" || passwardValue===""){
         showNotification("Please fill in all fields!","error");
         return;
    }

    const user={
        id:Date.now(),
        Firstname:firstNameValue,
        lastName:firstNameValue,
        email:emailValue,
        passward:passwardValue
    }

    let usersList=JSON.parse(localStorage.getItem("allusers"))||[]
    const currentEmail=usersList.some((user)=> user.email === emailValue);
    if(currentEmail){
        showNotification("this email is already registered ","error");
        return;
    }

    usersList.push(user);
    localStorage.setItem("allusers" ,JSON.stringify(usersList));
    

     setTimeout(() =>{
         showNotification("Registration successful! Redirecting...", "success");
        alert("🌷 Your garden is ready! Your Fleura account has been created.");
        window.location.href="login.html"
     },500)

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
