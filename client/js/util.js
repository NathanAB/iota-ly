var minChar = 4;
var maxChar = 25;

function alphaNumeric(str){
  return /[^a-zA-Z0-9]/.test(str) ? false : true;
}

function validPassword(str){
  return /^[a-zA-Z0-9!@#$%&*]+$/.test(str) ? true : false;
}

function validEmail(str){
  return str.indexOf("@") >= str.indexOf(".") ? false : true;      
}

function validateLogin(email, password){
  if(email.length < minChar || email.length > maxChar 
  || password.length < minChar || password.length > maxChar
  || !validEmail(email) || !validPassword(password)){
    $('#loginError').html("Invalid email or password");
  } else {
    return true;
  }
  $('#loginError').css("visibility", "visible");
  return false;
}

function validateRegistration(email, password, confirm){ 
  if(!validEmail(email)){
    $('#loginError').html("Must supply a valid email");
  } else if(password.length < minChar || password.length > maxChar) {
    $('#loginError').html("Password must be between " + minChar + " and " + maxChar + " characters");
  } else if(password != confirm){
    console.log(password + " " + confirm)
    $('#loginError').html("Passwords must match");
  } else if(!validEmail(email) || !validPassword(password)){
    $('#loginError').html("Email or password contains invalid characters");
  } else {
    return true;
  }
  $('#loginError').css("visibility", "visible");
  return false;
}