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

// FCC Solution:
// Create an array of objects which hold the denominations and their values
var denom = [{
        name: "ONE HUNDRED",
        val: 100.0
    },
    {
        name: "TWENTY",
        val: 20.0
    },
    {
        name: "TEN",
        val: 10.0
    },
    {
        name: "FIVE",
        val: 5.0
    },
    {
        name: "ONE",
        val: 1.0
    },
    {
        name: "QUARTER",
        val: 0.25
    },
    {
        name: "DIME",
        val: 0.1
    },
    {
        name: "NICKEL",
        val: 0.05
    },
    {
        name: "PENNY",
        val: 0.01
    }
];

function checkCashRegister(price, cash, cid) {
    var output = {
        status: null,
        change: []
    };
    var change = cash - price;

    // Transform CID array into drawer object
    var register = cid.reduce(
        function (acc, curr) {
            acc.total += curr[1];
            acc[curr[0]] = curr[1];
            return acc;
        }, {
            total: 0
        }
    );

    // Handle exact change
    if (register.total === change) {
        output.status = "CLOSED";
        output.change = cid;
        return output;
    }

    // Handle obvious insufficient funds
    if (register.total < change) {
        output.status = "INSUFFICIENT_FUNDS";
        return output;
    }

    // Loop through the denomination array
    var change_arr = denom.reduce(function (acc, curr) {
        var value = 0;
        // While there is still money of this type in the drawer
        // And while the denomination is larger than the change remaining
        while (register[curr.name] > 0 && change >= curr.val) {
            change -= curr.val;
            register[curr.name] -= curr.val;
            value += curr.val;

            // Round change to the nearest hundreth deals with precision errors
            change = Math.round(change * 100) / 100;
        }
        // Add this denomination to the output only if any was used.
        if (value > 0) {
            acc.push([curr.name, value]);
        }
        return acc; // Return the current change_arr
    }, []); // Initial value of empty array for reduce

    // If there are no elements in change_arr or we have leftover change, return
    // the string "Insufficient Funds"
    if (change_arr.length < 1 || change > 0) {
        output.status = "INSUFFICIENT_FUNDS";
        return output;
    }

    // Here is your change, ma'am.
    output.status = "OPEN";
    output.change = change_arr;
    return output;
}

// test here
checkCashRegister(19.5, 20.0, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90.0],
    ["FIVE", 55.0],
    ["TEN", 20.0],
    ["TWENTY", 60.0],
    ["ONE HUNDRED", 100.0]
]);

// another solution:
function checkCashRegister(price, cash, cid) {
    // All amounts are multiplied by 100 until the final result to avoid errors with floating point math
    const denominations = {
        "PENNY": 1,
        "NICKEL": 5,
        "DIME": 10,
        "QUARTER": 25,
        "ONE": 100,
        "FIVE": 500,
        "TEN": 1000,
        "TWENTY": 2000,
        "ONE HUNDRED": 10000
    }
    let changeDue = (cash * 100 - price * 100);
    const register = cid.reverse().map(el => [el[0], Math.round(el[1] * 100)]);
    const registerTotal = register.reduce((sum, elem) => (sum + elem[1]), 0);

    if (changeDue > registerTotal) return "Insufficient Funds";
    if (changeDue === registerTotal) return "Closed";

    let partial;
    let change = register.reduce((acc, elem) => {
        // for each denomination calculate the lesser of (a) the amount that could be paid with that
        // denomination without going over the amount owed, and (b) the actual amount of that denomination in 
        // the register. Denominations not used to make change are excluded from the resulting array.
        partial = Math.min(elem[1], Math.floor(changeDue / denominations[elem[0]]) * denominations[elem[0]]);
        if (partial > 0) {
            changeDue -= partial;
            acc.push([elem[0], partial / 100]);
        }
        return acc;
    }, [])

    // If the correct change could not be made from what was in the register.
    if (changeDue > 0) return "Insufficient Funds"

    return change;
}

// good one
function checkCashRegister(price, cash, cid) {
    //declare and initialize variables
    var change = Math.round((cash - price) * 100);
    var value = 0;
    var changeRecord = [];
    var currency = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
    //convert all floats to integers due to floating point number issue
    cid.forEach(el => el[1] = Math.round(el[1] * 100));
    //helper function to check if sufficient cash for change is in the drawer
    function enoughFund(cid) {
        var sum = cid.filter((el, i) => change >= currency[i]);
        return sum.reduce((a, b) => {
            return a + b[1];
        }, 0);
    }

    //Actual program/control flow starts here
    if (enoughFund(cid) < change)
        return "Insufficient Funds";
    else if (enoughFund(cid) === change)
        return "Closed";
    else {
        for (var i = cid.length - 1; i > -1; i--) {
            value = 0;
            while (cid[i][1] > 0 && change >= currency[i]) {
                //update everything as long as condition is true
                change -= currency[i];
                cid[i][1] -= currency[i];
                //value keeps track of the amount of each currency unit as change
                value += currency[i];
            }
            if (value)
                changeRecord.push([cid[i][0], value]);
        }
    }
    //divide each array by 100 to display a proper money format
    changeRecord.forEach(el => el[1] = (el[1] / 100));
    return changeRecord;
}