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

    }
})


function showNotification(message ,type){
    const message_div=document.createElement("div");
    message_div.innerHTML=message;
    
}
