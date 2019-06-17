(function getSession(){
  if(localStorage.getItem("userData") != null){
    document.querySelector(".main_container").classList.add("login")
  }
})();

function validateSpecialCharacter(value){
  return /[^a-zA-Z0-9\-\/]/.test(value);     
}

function validateEmail(emailField){
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(emailField);
}

function clearValidation(){
  
  let input = document.querySelectorAll(".invalid-feedback");
  for (let l = 0; l < input.length; l++) {
    input[l].parentNode.removeChild(input[l]);
  }
}

function showAlert(el, message){
  el.parentElement.classList.add("error-group");
  let mszEl = document.createElement("div");
  mszEl.className = "invalid-feedback";
  let textMsz = document.createTextNode(message);
  mszEl.appendChild(textMsz);
  el.parentElement.appendChild(mszEl);
  return false;
}

function validateForm(){
  clearValidation();
  let input = document.querySelectorAll(".required");
  for (let i = 0; i < input.length; i++) {
    if(input[i].value === ''){
     return showAlert(input[i], input[i].name+' must be filled out')
    }
  }

  let special = document.querySelectorAll(".not-special");
  for (let i = 0; i < special.length; i++) {
    if(validateSpecialCharacter(special[i].value)){
      return showAlert(special[i], 'Please fill valid ' + special[i].name)
    }
  }

  let email = document.querySelectorAll(".email");
  for (let i = 0; i < email.length; i++) {
    if(!validateEmail(email[i].value)){
      return showAlert(email[i], 'Please fill valid ' + email[i].name)
    }
  }

  let password = document.forms["register"]["password"];
  let pswConfirm = document.forms["register"]["pswConfirm"];

  if (password.value != pswConfirm.value) {
    return showAlert(pswConfirm, 'Password and Confirm Password must be same')
  }

  return true;
}

document.getElementById("registerForm").addEventListener("submit", function(event){
  event.preventDefault()
  if(validateForm()){
    const userData = {
      userName: document.forms["register"]["userName"].value,
      email: document.forms["register"]["email"].value,
      password: document.forms["register"]["password"].value,
      pswConfirm: document.forms["register"]["pswConfirm"].value
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    document.querySelector(".main_container").classList.add("login")
    
  }
});

