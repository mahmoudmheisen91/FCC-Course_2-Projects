function convertToRoman(num) {
  // Check gor numbers:
  if (typeof num != "number") return "not a number";

  // Split number to 4 digits:
  let numArr = [];
  while (num > 0 || numArr.length < 4) {
    numArr.unshift((num % 10));
    num = Math.floor(num / 10);
  }

  // all possipilities:
  let m = ["", "M", "MM", "MMM"];
  let c = ["", "C", "CC", "CCC", "CD", "D",
    "DC", "DCC", "DCCC", "CM"
  ];
  let x = ["", "X", "XX", "XXX", "XL", "L",
    "LX", "LXX", "LXXX", "XC"
  ];
  let i = ["", "I", "II", "III", "IV", "V",
    "VI", "VII", "VIII", "IX"
  ];

  // construct roman number:
  let thousands = m[numArr[0]];
  let hundereds = c[numArr[1]];
  let tens = x[numArr[2]];
  let ones = i[numArr[3]];

  let ans = thousands + hundereds + tens + ones;



  return ans;
}

function convertToRoman2(number) {
  let num = [1, 4, 5, 9, 10, 40, 50, 90,
    100, 400, 500, 900, 1000
  ];
  let sym = ["I", "IV", "V", "IX", "X", "XL",
    "L", "XC", "C", "CD", "D", "CM", "M"
  ];
  let i = 12;
  let romanized = "";
  while (number) {
    let div = Math.floor(number / num[i]);
    number %= num[i];

    while (div) {
      romanized += sym[i];
      div -= 1;
    }
    i -= 1;
  }
  return romanized;
}
console.log(convertToRoman2(136));