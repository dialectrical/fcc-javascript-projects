function palindrome(str) {
  var strCap = str.toUpperCase();
  var strExtract = strCap.match(/[A-Za-z0-9]/g);
  var palCheck = "";
  var strCheck = "";
  var i = strExtract.length;
  var n = 0;
  for (n; n < i; n++) {
    strCheck += strExtract[n];
  }
  for (i; i > 0; i--) {
    palCheck += strExtract[i - 1];
  }
  if (palCheck == strCheck) {
    return true;
  } else {
    return false;
  }
}



console.log(palindrome("_eye"));
