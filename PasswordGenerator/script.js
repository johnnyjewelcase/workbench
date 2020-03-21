// Write a function that takes user input and creates a password
// based on that input and returns it
function generatePassword() {
  /****
   * WRITE YOUR CODE HERE
   */

  // Once the user clicks "Generate Password" button, they are prompted to provide the length of their desired password.
  var pwLength = prompt("Create a password. How many characters long?");

  // The password length is checked for various issues, and the user is given the appropriate feedback if necessary.
  // 1: Letters are not allowed.
  if (isNaN(pwLength)) {
    return ("Please enter a number!");
    // 2: Decimals are not allowed.
  } else if ((parseFloat(pwLength) - parseInt(pwLength)) !== 0) {
    return ("Please enter a whole number!");
    // 3: The password length must be within this range.
  } else if (pwLength < 8 || pwLength > 128) {
    return ("Passwords must be between 8 and 128 characters!");
  } else {
    // Password lengths that pass the above tests are converted to an integer.
    console.log("selected password length: " + pwLength);
    pwLength = parseInt(pwLength);
  }

  // The user is prompted for which character sets to include for inclusion in the password.
  var useLower = confirm("Include lowercase letters?");
  var useUpper = confirm("Include uppercase letters?");
  var useNumber = confirm("Include numbers?");
  var useSpecial = confirm("Include special characters?");

  // The user is alerted if they failed to select any character sets.
  if (useLower === false && useUpper === false && useNumber === false && useSpecial === false) {
    return ("You haven't picked any characters to choose from!");
  }

  // Concatenate selected characters into an array by looping through the ASCII values in that set (ASCII REFERENCE: https://www.w3schools.com/charsets/ref_html_ascii.asp)
  var chars = [];
  if (useLower === true) {
    console.log("lowercase letters selected");
    // chars = chars.concat(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    for (var l = 97; l <= 122; l++) {
      chars = chars.concat(String.fromCharCode(l));
    }
  }
  if (useUpper === true) {
    console.log("uppercase letters selected");
    // chars = chars.concat(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
    for (var u = 65; u <= 90; u++) {
      chars = chars.concat(String.fromCharCode(u));
    }
  }
  if (useNumber === true) {
    console.log("numbers selected");
    // chars = chars.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (var n = 48; n <= 57; n++) {
      chars = chars.concat(String.fromCharCode(n));
    }
  }
  if (useSpecial === true) {
    console.log("special characters selected");
    // chars = chars.concat(["!", "\\", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~"]);
    for (var s1 = 33; s1 <= 47; s1++) {
      chars = chars.concat(String.fromCharCode(s1));
    }
    for (var s2 = 123; s2 <= 126; s2++) {
      chars = chars.concat(String.fromCharCode(s2));
    }
  }

  console.log("possible character array:");
  console.log(chars);

  // Randomly select a number, pull the corresponding value from the array of possible characters, and add it to the end of the password variable. Repeat until the user-selected length has been met.
  var password = "";
  for (var i = 1; i < (pwLength + 1); i++) {
    var randomNumInRange = Math.floor(Math.random() * (chars.length));
    password = password + chars[randomNumInRange];

    // Check to make sure 'undefined' and other unwanted characters didn't make it into the array.
    if (chars[randomNumInRange].length > 1) {
      console.log("INVALID CHARACTER SELECTED: " + chars[randomNumInRange]);
      break;
    }
  }

  // Check to make sure the loop didn't end prematurely because I forgot how to count again.
  if (pwLength > password.length) {
    return ("Oops. We didn't make a long enough password. Try Again.");
  }

  // Send the password variable to the screen.
  console.log(password);
  return (password);
}

// Locate the new "Copy to Clipboard" button in the html.
var copyBtn = document.querySelector("#clipboard");

// Create a function to copy the generated password to the clipboard.
function copyPassword() {
  // Assign the generated password to a variable and select the text.
  var copyText = document.getElementById("password");

  copyText.select();

  // Copy selected text and alert user that it has been done.
  document.execCommand("copy");

  alert("Password copied to clipboard.");
}

// Call the approrpriate function when the "Copy to Clipboard" button is clicked.
copyBtn.addEventListener("click", copyPassword);

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