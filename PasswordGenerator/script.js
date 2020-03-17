// Write a function that takes user input and creates a password
// based on that input and returns it
function generatePassword() {
  /****
   * WRITE YOUR CODE HERE
   */
  var pwLength = prompt("Create a password. How many characters long?");

  if (isNaN(pwLength)) {
    return ("Please enter a number!");
  } else if ((parseFloat(pwLength) - parseInt(pwLength)) !== 0) {
    return ("Please enter a whole number!");
  } else if (pwLength < 8) {
    return ("Passwords must have at least eight characters!");
  } else if (pwLength > 128) {
    return ("Passwords cannot be longer than 128 characters!");
  } else {
    pwLength = parseInt(pwLength);
  }

  var useLower = confirm("Include lowercase letters?");
  var useUpper = confirm("Include uppercase letters?");
  var useNumber = confirm("Include numbers?");
  var useSpecial = confirm("Include special characters?");

  if (useLower === false && useUpper === false && useNumber === false && useSpecial === false) {
    alert("You haven't picked any characters to choose from!");
    return;
  }

  // POPULATE ARRAY FROM ASCII REFERENCE: https://www.w3schools.com/charsets/ref_html_ascii.asp
  var chars = [];
  if (useLower === true) {
    console.log("lowercase letters selected")
    // chars = chars.concat(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    for (var l = 97; l <= 122; l++) {
      chars = chars.concat(String.fromCharCode(l));
    }
  }
  if (useUpper === true) {
    console.log("uppercase letters selected")
    // chars = chars.concat(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
    for (var u = 65; u <= 90; u++) {
      chars = chars.concat(String.fromCharCode(u));
    }
  }
  if (useNumber === true) {
    console.log("numbers selected")
    // chars = chars.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (var n = 48; n <= 57; n++) {
      chars = chars.concat(String.fromCharCode(n));
    }
  }
  if (useSpecial === true) {
    console.log("special characters selected")
    // chars = chars.concat(["!", "\\", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"]);
    for (var s1 = 33; s1 <= 47; s1++) {
      chars = chars.concat(String.fromCharCode(s1));
    }
    for (var s2 = 123; s2 <= 126; s2++) {
      chars = chars.concat(String.fromCharCode(s2));
    }
  }

  var password = "";
  console.log("possible character array:");
  console.log(chars);
  console.log("selected pw length: " + pwLength);

  for (var i = 1; i < (pwLength + 1); i++) {
    var randomNumInRange = Math.floor(Math.random() * (chars.length));
    password = password + chars[randomNumInRange];

    if (chars[randomNumInRange].length > 1) {
      console.log("INVALID GENERATED IN THIS LOOP: " + chars[randomNumInRange]);
      break;
    }
  }

  if (pwLength > password.length) {
    return ("Oops. We didn't make a long enough password. Try Again.");
  }

  console.log(password);
  return (password);
}

//////////////////////////////////////////////////////////////
// DO NOT TOUCH THE CODE BELOW
//////////////////////////////////////////////////////////////
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);