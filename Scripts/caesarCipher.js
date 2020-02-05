function rot13(str) { // LBH QVQ VG!
    let letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let newStr = str.split("").map(item => {
        let i = letterArray.indexOf(item);
        if (i >= 0) {
            if (i < 13) i = i + 13;
            else i = i - 13;
        } else return item;
        let elem = letterArray[i];
        return elem;
    });

    return newStr.join("");
}

// Change the inputs below to test
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));

function rot13_2(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return str
        .split('')
        .map(char => {
            const pos = alphabet.indexOf(char);
            return pos >= 0 ? alphabet[(pos + 13) % 26] : char;
        })
        .join('');
}

function rot13_3(str) {
    // LBH QVQ VG!
    return str.replace(/[A-Z]/g, L =>
        String.fromCharCode((L.charCodeAt(0) % 26) + 65)
    );
}

// Solution with Regular expression and Array of ASCII character codes
function rot13_4(str) {
    var rotCharArray = [];
    var regEx = /[A-Z]/;
    str = str.split("");
    for (var x in str) {
        if (regEx.test(str[x])) {
            // A more general approach
            // possible because of modular arithmetic
            // and cyclic nature of rot13 transform
            rotCharArray.push(((str[x].charCodeAt() - 65 + 13) % 26) + 65);
        } else {
            rotCharArray.push(str[x].charCodeAt());
        }
    }
    str = String.fromCharCode.apply(String, rotCharArray);
    return str;
}