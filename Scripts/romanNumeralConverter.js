function convertToRoman(num) {
  // Check gor numbers:
  if (typeof num != "number") return "not a number";

  let romanLetters = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M"
  };

  let numArr = [];
  let multiplier = 1;
  while (num > 0) {
    numArr.unshift((num % 10) * multiplier);
    num = Math.floor(num / 10);
    multiplier *= 10;
  }

  for (let i = 0; i < numArr.length; i++) {}

  let romanArr = [];

  return numArr;
}

console.log(convertToRoman(136));
