function checkCashRegister(price, cash, cid) {
    let change = {
        status: "",
        change: []
    };

    let cashAmount = roundNumber(cid_amount(cid));
    let amountToReturn = roundNumber(cash - price);

    if (cashAmount < amountToReturn) {
        change.status = "INSUFFICIENT_FUNDS";
        change.change = [];
    } else if (cashAmount == amountToReturn) {
        change.status = "CLOSED";
        change.change = cid;
    } else { // cashAmount > amountToReturn
        change.status = "OPEN";

        let j = 0;
        let currentAmountToReturn = amountToReturn;

        //print(cid[i]);
        for (let i = cid.length - 1; i >= 0; i--) {
            let bill_value = billValue(cid[i][0]);

            if (bill_value > currentAmountToReturn || cid[i][1] == 0)
                continue;

            let num_bills = cid[i][1] / bill_value;

            let returned = 0;
            let m = 1;

            while (m <= num_bills && currentAmountToReturn >= bill_value) {
                currentAmountToReturn -= bill_value;
                currentAmountToReturn = roundNumber(currentAmountToReturn);
                change.change[j] = [cid[i][0], m * bill_value];

                m++;
            }

            j++;
        }

        if (roundNumber(cid_amount(change.change)) < amountToReturn) {
            change.status = "INSUFFICIENT_FUNDS";
            change.change = [];
        }
    }
    return change;
}

function billValue(str) {
    let val = 0;
    switch (str) {
        case "PENNY":
            val = 0.01;
            break;
        case "NICKEL":
            val = 0.05;
            break;
        case "DIME":
            val = 0.1;
            break;
        case "QUARTER":
            val = 0.25;
            break;
        case "ONE":
            val = 1;
            break;
        case "FIVE":
            val = 5;
            break;
        case "TEN":
            val = 10;
            break;
        case "TWENTY":
            val = 20;
            break;
        case "ONE HUNDRED":
            val = 100;
            break;
    }
    return val;
}

function cid_amount(cid) {
    let sum = 0;
    for (let i = 0; i < cid.length; i++) {
        sum += cid[i][1];
    }

    return sum;
}

let roundNumber = (num) =>
    Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);

let print = (stuff) => console.log(stuff);

print(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]));