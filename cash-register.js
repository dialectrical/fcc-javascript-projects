const checkCashRegister = (price, cash, cid) => {
  let drawer = new Map();
  let changeDue = cash - price;

  drawer.set("totalValue", 0);

  if (changeDue === 0) {
    return { status: "OPEN", change: [] };
  }

  for (let i = 0; i < cid.length; i++) {
    let currencyValue;
    if (cid[i][0] === "PENNY") {
      currencyValue = 0.01;
    } else if (cid[i][0] === "NICKEL") {
      currencyValue = 0.05;
    } else if (cid[i][0] === "DIME") {
      currencyValue = 0.1;
    } else if (cid[i][0] === "QUARTER") {
      currencyValue = 0.25;
    } else if (cid[i][0] === "ONE") {
      currencyValue = 1;
    } else if (cid[i][0] === "TEN") {
      currencyValue = 10;
    } else if (cid[i][0] === "TWENTY") {
      currencyValue = 20;
    } else if (cid[i][0] === "ONE HUNDRED") {
      currencyValue = 100;
    }
    drawer.set("totalValue", drawer.get("totalValue") + cid[i][1]);
    drawer.set(cid[i][0], cid[i][1] / currencyValue);
  }
  console.log(drawer.get("totalValue"));

  if (changeDue > drawer.get("totalValue")) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeDue === drawer.get("totalValue")) {
    return { status: "CLOSED", change: cid.reverse() };
  }

  let changeArr = [];

  while (changeDue >= 0.01) {
    if (Math.floor(changeDue / 100) > 0) {
      if (cid[8][1] >= Math.floor(changeDue / 100) * 100) {
        changeArr.push(["ONE HUNDRED", Math.floor(changeDue / 100) * 100]);
        cid[8][1] -= Math.floor(changeDue / 100) * 100;
        changeDue -= Math.floor(changeDue / 100) * 100;
      } else {
        changeArr.push(cid[8]);
        changeDue -= cid[8][1];
        cid[8][1] = 0;
      }
    }
    if (Math.floor(changeDue / 20) > 0) {
      if (cid[7][1] >= Math.floor(changeDue / 20) * 20) {
        changeArr.push(["TWENTY", Math.floor(changeDue / 20) * 20]);
        cid[7][1] -= Math.floor(changeDue / 20) * 20;
        changeDue -= Math.floor(changeDue / 20) * 20;
      } else {
        changeArr.push(cid[7].slice().slice());
        changeDue -= cid[7][1];
        cid[7][1] = 0;
      }
    }
    if (Math.floor(changeDue / 10) > 0) {
      if (cid[6][1] >= Math.floor(changeDue / 10) * 10) {
        changeArr.push(["TEN", Math.floor(changeDue / 10) * 10]);
        cid[6][1] -= Math.floor(changeDue / 10) * 10;
        changeDue -= Math.floor(changeDue / 10) * 10;
      } else {
        changeArr.push(cid[6].slice());
        changeDue -= cid[6][1];
        cid[6][1] = 0;
      }
    }
    if (Math.floor(changeDue / 5) > 0) {
      if (cid[5][1] >= Math.floor(changeDue / 5) * 5) {
        changeArr.push(["FIVE", Math.floor(changeDue / 5) * 5]);
        cid[5][1] -= Math.floor(changeDue / 5) * 5;
        changeDue -= Math.floor(changeDue / 5) * 5;
      } else {
        changeArr.push(cid[5].slice());
        changeDue -= cid[5][1];
        cid[5][1] = 0;
      }
    }
    if (Math.floor(changeDue / 1) > 0) {
      if (cid[4][1] >= Math.floor(changeDue / 1) * 1) {
        changeArr.push(["ONE", Math.floor(changeDue / 1)]);
        cid[4][1] -= Math.floor(changeDue / 1) * 1;
        changeDue -= Math.floor(changeDue / 1) * 1;
      } else {
        changeArr.push(cid[4].slice());
        changeDue -= cid[4][1];
        cid[4][1] = 0;
      }
    }
    if (Math.floor(changeDue / 0.25) > 0) {
      if (cid[3][1] >= Math.floor(changeDue / 0.25) * 0.25) {
        changeArr.push(["QUARTER", Math.floor(changeDue / 0.25) * 0.25]);
        cid[3][1] -= Math.floor(changeDue / 0.25) * 0.25;
        changeDue -= Math.floor(changeDue / 0.25) * 0.25;
      } else {
        changeArr.push(cid[3].slice());
        changeDue -= cid[3][1];
        cid[3][1] = 0;
      }
    }
    if (Math.floor(changeDue / 0.1) > 0) {
      if (cid[2][1] >= Math.floor(changeDue / 0.1) * 0.1) {
        changeArr.push(["DIME", Math.floor(changeDue / 0.1) * 0.1]);
        cid[2][1] -= Math.floor(changeDue / 0.1) * 0.1;
        changeDue -= Math.floor(changeDue / 0.1) * 0.1;
      } else {
        changeArr.push(cid[2].slice());
        changeDue -= cid[2][1];
        cid[2][1] = 0;
      }
    }
    if (Math.floor(changeDue / 0.05) > 0) {
      if (cid[1][1] >= Math.floor(changeDue / 0.05) * 0.05) {
        changeArr.push(["NICKEL", Math.floor(changeDue / 0.05) * 0.05]);
        cid[1][1] -= Math.floor(changeDue / 0.05) * 0.05;
        changeDue -= Math.floor(changeDue / 0.05) * 0.05;
      } else {
        changeArr.push(cid[1].slice());
        changeDue -= cid[1][1];
        cid[1][1] = 0;
      }
    }
    if (Math.floor(changeDue / 0.01) > 0) {
      if (cid[0][1] >= Math.floor(changeDue / 0.01) * 0.01) {
        changeArr.push(["PENNY", Math.floor(changeDue / 0.01) * 0.01]);
        cid[0][1] -= Math.floor(changeDue / 0.01) * 0.01;
        changeDue -= Math.floor(changeDue / 0.01) * 0.01;
      } else {
        changeArr.push(cid[0].slice());
        changeDue -= cid[0][1];
        cid[0][1] = 0;
      }
    }
  }

  console.log({ status: "OPEN", change: changeArr });
  return { status: "OPEN", change: changeArr };
};

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
