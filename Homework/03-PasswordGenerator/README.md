# JavaScript Password Generator

1.  Once the user clicks "Generate Password" buttonin the provided html, a prompt box asks them to provide the length of their desired password.
    The password length is checked for the following potential issues:

    - Letters are not allowed.
    - Decimals are not allowed.
    - The password length must be at least 8 characters and no more than 128 characters.

    _The user is given the appropriate feedback if necessary._

1.  Password lengths that pass the above tests are converted to an integer.

1.  The user is prompted for which character sets to include for inclusion in the password:

    - lowercase letters
    - uppercase letters
    - numbers
    - special characters

    _The user is alerted if they did not select any of the available character sets._

1.  Selected characters are concatenated into an _array of possible characters_ by looping through the [ASCII values](https://www.w3schools.com/charsets/ref_html_ascii.asp) in that set.
1.  Generate a password:
    1. Randomly select a number that is not greater than the length of the _array of possible characters_.
    1. Pull the corresponding value from the _array of possible characters_, and add it to the end of the password variable.
    1. Check the length of each character as it is added to make sure "undefined" and other unwanted characters didn't make it into the array.
    1. Repeat until the user-selected password length has been met.
1.  The password length is checked to make sure that the loop didn't end prematurely.
1.  The generated password is returned from the query and written to the page.
1.  Once the password is generated, if the user clicks the _Copy to Clipboard_ button:
    1. Call the function to find the password, select the text, and copy it to the clipboard.
    1. Alert the user that the password has been copied.
