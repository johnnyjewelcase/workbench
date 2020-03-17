// Write a function that takes user input and creates a password
// based on that input and returns it
function generatePassword() {
  /****
   * WRITE YOUR CODE HERE
   */
  var password = "";

  var pwLength = prompt("Create a password. How many characters long?");

  if (isNaN(pwLength)) {
    alert("Please enter a number!");
    return;
  } else if ((parseFloat(pwLength) - parseInt(pwLength)) !== 0) {
    console.log(pwLength);
    console.log(parseFloat(pwLength));
    console.log(parseInt(pwLength));
    alert("Please enter a whole number!");
    return;
  } else if (pwLength < 8) {
    alert("Passwords must have at least eight characters!");
    return;
  } else if (pwLength > 128) {
    alert("Passwords cannot be longer than 128 characters!");
    return;
  } else {
    pwLength = parseInt(pwLength);
  }


  var charLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var charUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var charNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var charSpecial = ["!", "\\", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"];
  var chars = [];

  var useLower = confirm("Include lowercase letters?");
  var useUpper = confirm("Include uppercase letters?");
  var useNumber = confirm("Include numbers?");
  var useSpecial = confirm("Include special characters?");

  if (useLower === false && useUpper === false && useNumber === false && useSpecial === false) {
    alert("You haven't picked any characters to choose from!");
    return;
  }

  if (useLower === true) {
    console.log(charLower);
    chars = chars.concat(charLower);
  }

  if (useUpper === true) {
    console.log(charUpper);
    chars = chars.concat(charUpper);
  }

  if (useNumber === true) {
    console.log(charNumber);
    chars = chars.concat(charNumber);
  }

  if (useSpecial === true) {
    console.log(charSpecial);
    chars = chars.concat(charSpecial);
  }

  // console.log("character array:");
  // console.log(chars);
  // console.log("selected pw length:");
  // console.log(pwLength);


  var curPwLength = 0;
  var lastPwLength = 0;

  for (var i = 1; i < (pwLength + 1); i++) {
    // console.log("i:");
    // console.log(i);
    var randomNumInRange = Math.floor(Math.random() * (chars.length));
    // console.log("random number:");
    // console.log(randomNumInRange);
    // console.log("randomly selected character:");
    // console.log(chars[randomNumInRange]);
    password = password + chars[randomNumInRange];
    // console.log("partial password:");
    // console.log(password);

    curPwLength = password.length;
    if (curPwLength - lastPwLength > 1) {
      console.log("TOO MANY CHARACTERS GENERATED")
      break;
    }
    lastPwLength = password.length;
  }

  console.log("generated password length:");
  console.log(password.length);

  if (pwLength > password.length) {
    alert("Oops. We didn't make a long enough password. Try Again.");
    return;
  }

  console.log(password);
  // alert(password);
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