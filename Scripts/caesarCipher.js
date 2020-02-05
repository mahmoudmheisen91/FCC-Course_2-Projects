function rot13(str) { // LBH QVQ VG!
    let letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let newStr = str.split("").map((item, index) => {
        let i = letterArray.indexOf(item);
        if (i >= 0) {
            if (i - 13 < 0) i = i + 13;
            else i = i - 13;
        } else return item;
        let elem = letterArray[i];
        return elem;
    });

    return newStr.join("");
}

// Change the inputs below to test
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));