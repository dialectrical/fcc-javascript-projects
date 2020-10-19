const ROMAN_NUM = [ //lookup table for conversion output
  { 0: "", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX" },
  { 0: "", 1: "X", 2: "XX", 3: "XXX", 4: "XL", 5: "L", 6: "LX", 7: "LXX", 8: "LXXX", 9: "XC" },
  { 0: "", 1: "C", 2: "CC", 3: "CCC", 4: "CD", 5: "D", 6: "DC", 7: "DCC", 8: "DCCC", 9: "CM" },
  { 0: "", 1: "M", 2: "MM", 3: "MMM" }
];

function convertToRoman (num) {
  var romanNum ="";
  //below vars seemed necessary? would prefer to do without but errors?
  var numString = num.toString();
  var numLength = numString.length;
  var i = numLength;
var n = 0;
  //check number length then convert based on 4/3/2/1 length
  if (numString.length == 4) {
    for (i; i > 0; i--) {
        romanNum += ROMAN_NUM[i - 1][numString[n]];
        n++;
    }
  } else if (numString.length == 3) {
      for (i; i > 0; i--) {
        romanNum += ROMAN_NUM[i - 1][numString[n]];
        n++;
      }
  } else if (numString.length == 2) {
      for (i; i > 0; i--) {
        romanNum += ROMAN_NUM[i - 1][numString[n]];
        n++;
    }
  } else {
    romanNum += ROMAN_NUM[0][numString];
  }
  return romanNum;
}

console.log(convertToRoman(1));
