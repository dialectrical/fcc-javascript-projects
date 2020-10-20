function telephoneCheck (str) {
  if (str.match(/\d/g).length > 11 || str.match(/\d/g).length < 10) {
    console.log("Failed length check");
    return false;
  } else if (!str.match(/^1/) && str.match(/\d/g).length == 11) {
    console.log("Failed starting digit check");
    return false;
  } else if (!str.match(/^1*\(\d\d\d\)/g) && !str.match(/^1\s*\(\d\d\d\)/g) && !str.match(/^1*\d\d\d/) && !str.match(/^1\s\d\d\d/) || str.match(/^\d\d\d\)/) || str.match(/\(\d\d\?\)/) || str.match (/^1\s\d\d\d\)/)) {
    console.log("Failed parantheses usage check");
    return false;
  } else if (!str.match(/\d\d\d\)*-*/g)) {
    console.log("Failed dash usage check");
    return false;
  } else {
    return true;
  }
}
