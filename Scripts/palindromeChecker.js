function palindrome(str) {
  // Type check:
  if (typeof str != "string") return false;

  // Extract string:
  let newStrRegex = /[^_\W]/gi;
  let newStr = str
    .match(newStrRegex)
    .join("")
    .toLowerCase();

  return (
    newStr ==
    newStr
      .split("")
      .reverse()
      .join("")
  );
}
// The algorithm would take way too long if he passed
// the Bible as the string. He wanted it to be instant.
// Cyclomatic Complexity
// https://en.wikipedia.org/wiki/Cyclomatic_complexity
console.log(palindrome("eye"));

//this solution performs at minimum 7x better, at maximum
// infinitely better.
//read the explanation for the reason why.
function palindrome2(str) {
  //assign a front and a back pointer
  let front = 0;
  let back = str.length - 1;

  //back and front pointers won't always meet in the middle,
  //   so use (back > front)
  while (back > front) {
    //increments front pointer if current character doesn't meet
    // criteria
    if (str[front].match(/[\W_]/)) {
      front++;
      continue;
    }
    //decrements back pointer if current character doesn't
    // meet criteria
    if (str[back].match(/[\W_]/)) {
      back--;
      continue;
    }
    //finally does the comparison on the current character
    if (str[front].toLowerCase() !== str[back].toLowerCase()) return false;
    front++;
    back--;
  }

  //if the whole string has been compared without returning false,
  //   it's a palindrome!
  return true;
}
