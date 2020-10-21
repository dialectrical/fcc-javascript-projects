//CONST sets value of cash tokens
const TOKEN_VALUE = {"PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.10, "QUARTER": 0.25, "ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100};

//determines total value of cash in drawer
function cidTotal(cid) {
  let cidValue = 0;
  for (let i = 0; i < cid.length; i++) {
    cidValue += cid[i][1];
  }
    return Math.round(cidValue * 100) / 100;
}

//determine amount of each token in drawer
function tokenCount (cid) {
  //contains amount of each particular token
  let tokenTotal =
  [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];
  //loop through cid array and calculate total amount of each token
  for (let i = 0; i < cid.length; i++) {
    tokenTotal[i][1] += Math.round((cid[i][1] / TOKEN_VALUE[cid[i][0]]) * 100) / 100;
  }
  return tokenTotal;
}

//detremines if it possible to return exact change for a transaction
function makeChange (price, cash, cid) {
  var tokenAmount = tokenCount (cid);
  let changeDue = cash - price;
  let changeGiven =
    [
      ["PENNY", 0],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ];
    for(var i = cid.length; i > 0; i--) {
      var tokenNeeded = Math.floor(changeDue / TOKEN_VALUE[cid[i - 1][0]]);
      if (tokenAmount[i - 1][1] - tokenNeeded < 0) {
        changeDue -= (TOKEN_VALUE[cid[i - 1][0]] * tokenAmount[i - 1][1]);
        changeGiven[i-1][1] += (TOKEN_VALUE[cid[i - 1][0]] * tokenAmount[i - 1][1]);
        tokenAmount[i - 1][1] = 0;
      } else {
        tokenAmount[i - 1][1] -= tokenNeeded;
        changeDue -= (TOKEN_VALUE[cid[i - 1][0]] * tokenNeeded);
        changeGiven[i - 1][1] += (TOKEN_VALUE[cid[i - 1][0]] * tokenNeeded);
      }
    }
    if (Math.round(changeDue * 100) / 100 === 0) {
      return true;
    } else {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
}

//split sorter
function changeSort(changeGiven) {
  let changeSort = [];
  let changeArray = [];
  //first, remove any 0s and pass non-0s to changesort
  for (let i = 0; i < changeGiven.length; i++) {
    if (changeGiven[i][1] > 0) {
      changeSort.push(changeGiven[i]);
    }
  }
  //then sort it in descending order!
  changeSort.sort(function (a,b){return b-a});
  for (let i = 0; i < changeSort.length; i++) {
    changeArray.push(changeSort[i]);
  }
  return changeArray;
}

function checkCashRegister(price, cash, cid) {
  if (cidTotal(cid) < price - cash) {

    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (cidTotal(cid) == cash - price){
    return {status: "CLOSED", change: cid};
  } else{
    let tokenAmount = tokenCount (cid);
    let changeDue = cash - price;
    let changeGiven =
      [
        ["PENNY", 0],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
      ];
    for(let i = cid.length; i > 0; i--) {
      let tokenNeeded = Math.floor(changeDue / TOKEN_VALUE[cid[i - 1][0]]);
      if (tokenAmount[i - 1][1] - tokenNeeded < 0) {
        changeDue -= (TOKEN_VALUE[cid[i - 1][0]] * tokenAmount[i - 1][1]);
        changeGiven[i-1][1] += (TOKEN_VALUE[cid[i - 1][0]] * tokenAmount[i - 1][1]);
        tokenAmount[i - 1][1] = 0;
      } else {
        tokenAmount[i - 1][1] -= tokenNeeded;
        changeDue -= (TOKEN_VALUE[cid[i - 1][0]] * tokenNeeded);
        changeGiven[i - 1][1] += (TOKEN_VALUE[cid[i - 1][0]] * tokenNeeded);
      }
    }
    console.log(changeDue);
    if (changeDue < 0.01 && changeDue != 0) { //brute force solution to issue with decimal values
        changeGiven[0][1] += 0.01;
      }
    if (Math.round(changeDue * 100) / 100 === 0 || changeDue < 0.1) {
      return {status: "OPEN", change: changeSort(changeGiven)};
    } else {
      console.log(changeDue);
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  }
}
