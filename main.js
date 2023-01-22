const mapping = {
    "A" : ".-", "B" : "-...","C" : "-.-.", "D" : "-..",
    "E" : ".", "F" : "..-.", "G" : "--.", "H" : "....",
    "I" : "..", "J" : ".---", "K" : "-.-", "L" : ".-..",
    "M" : "--", "N" : "-.", "O" : "---", "P" : ".--.",
    "Q" : "--.-", "R" : ".-.", "S" : "...", "T" : "-",
    "U" : "..-", "V" : "...-", "W" : ".--", "X" : "-..-",
    "Y" : "-.--", "Z" : "--..",


    "0" : "-----",
    "1" : ".----", "2" : "..---", "3" : "...--",
    "4" : "....-", "5" : ".....", "6" : "-....",
    "7" : "--...", "8" : "---..", "9" : "----."
}

const mapping2 = {
    "A" : 0,
    "B" : 1,
    "C" : 2,
    "D" : 3,
    "E" : 4,
    "F" : 5,
    "G" : 6,
    "H" : 7,
    "I" : 8,
    "J" : 9,
    "K" : 10,
    "L" : 11,
    "M" : 12,
    "N" : 13,
    "O" : 14,
    "P" : 15,
    "Q" : 16,
    "R" : 17,
    "S" : 18,
    "T" : 19,
    "U" : 20,
    "V" : 21,
    "W" : 22,
    "X" : 23,
    "Y" : 24,
    "Z" : 25,

}

function toggle()
{
    const decrypt = "Decrypt Message";
    const encrypt = "Encrypt Message";
    let curr = document.getElementById("toggle").innerHTML;

    if(curr === decrypt)
    {
        document.getElementById("toggle").innerHTML = encrypt;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Paste your code";
        document.getElementById("convert").innerHTML = "Convert to Plain Text"
        document.getElementById("convert").setAttribute('onclick','morse2text()');
    }
    else if(curr === encrypt){
        document.getElementById("toggle").innerHTML = decrypt;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Write your message";
        document.getElementById("convert").innerHTML = "Convert to Morse Code"
        document.getElementById("convert").setAttribute('onclick','text2morse()');
    }
}

function toggle2()
{
    const decrypt2 = "Decrypt Affine Cipher";
    const encrypt2 = "Encrypt Affine Cipher";
    let curr = document.getElementById("toggle2").innerHTML;

    if(curr === decrypt2)
    {
        document.getElementById("toggle2").innerHTML = encrypt2;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Paste your code";
        document.getElementById("convert2").innerHTML = "Convert to Plain Text"
        document.getElementById("convert2").setAttribute('onclick','affine2text()');
    }
    else if(curr === encrypt2){
        document.getElementById("toggle2").innerHTML = decrypt2;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Write your message";
        document.getElementById("convert2").innerHTML = "Convert to Affine Cipher"
        document.getElementById("convert2").setAttribute('onclick','text2affine()');
    }
}

function toggle3()
{
    const decrypt3 = "Decrypt Vigenere Cipher";
    const encrypt3 = "Encrypt Vigenere Cipher";
    let curr = document.getElementById("toggle3").innerHTML;

    if(curr === decrypt3)
    {
        document.getElementById("toggle3").innerHTML = encrypt3;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Paste your code";
        document.getElementById("convert3").innerHTML = "Convert to Plain Text"
        document.getElementById("convert3").setAttribute('onclick','vigenere2text()');
    }
    else if(curr === encrypt3){
        document.getElementById("toggle3").innerHTML = decrypt3;
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("input").placeholder = "Write your message";
        document.getElementById("convert3").innerHTML = "Convert to Vigenere Cipher"
        document.getElementById("convert3").setAttribute('onclick','text2vigenere()');
    }
}





function text2morse()
{
    let input = document.getElementById("input").value;

    input = input.toUpperCase();

    let arr1 = input.split("");

    let arr2 = arr1.map(x => {
        if(mapping[x])
        {
            return mapping[x];
        }
        else{
            return x;
        }
    });

    let code = arr2.join(" ");

    document.getElementById("output").value = code;
}


function getKey(obj, val) {
    return Object.keys(obj).find(key => obj[key] === val);
}


function morse2text()
{
    let code = document.getElementById("input").value;
    let arr1 = code.split(" ");

    let arr2 = arr1.map(x=>{
        if(getKey(mapping,x))
        {
            return getKey(mapping,x);
        }
        else if(x===""){
            return " ";
        }
        else{
            return x;
        }
    });

    let text = arr2.join("").replace(/\s\s+/g, ' ');
    document.getElementById("output").value = text;
}

function saveTextAsFile(textToWrite, fileNameToSaveAs){
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    if (window.webkitURL != null){
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    downloadLink.click();
}


document.getElementById("upload").addEventListener('change', function(event){
    event.preventDefault();

    let fr = new FileReader();
    fr.onload = function (){
        document.getElementById("input").textContent = fr.result
    }
    fr.readAsText(this.files[0]);
});


function affineFormula(item, index, arr) {
    arr[index] = ( 7 * item + 5) % 26;
}
function reversAffineFormula(item, index, arr) {
    arr[index] = (15 * (item - 5) % 26) % 26;
}

function text2affine()
{
    let input = document.getElementById("input").value;

    input = input.toUpperCase();

    let arr1 = input.split("");

    let arr2 = arr1.map(x => {
        if(mapping2[x])
        {
            return mapping2[x];
        }else if(x === "a" || "A"){
            return 0;
        }
        else{
            return x;
        }
    });

    arr2.forEach(affineFormula);

    let arr3 = arr2.map(x=>{
        if(getKey(mapping2,x))
        {
            return getKey(mapping2,x);
        }
        else if(x===""){
            return " ";
        }
        else{
            return x;
        }
    });

    let text = arr3.join("").replace(/\s\s+/g, ' ');
    document.getElementById("output").value = text;

}

function affine2text()
{
    let input = document.getElementById("input").value;

    input = input.toUpperCase();

    let arr1 = input.split("");

    let arr2 = arr1.map(x => {
        if(mapping2[x])
        {
            return mapping2[x];
        }else if(x === "a" || "A") {
            return 0;
        }else{
            return x;
        }
    });

    arr2.forEach(reversAffineFormula);

    let arr5 = arr2.map((x) => parseInt(x));
    let arr6 = arr5.map(x => {
        if (x < 0) {
            return x + 26;
        } else {
            return x;
        }
    });




    let arr3 = arr6.map(x=>{
        if(getKey(mapping2,x))
        {
            return getKey(mapping2,x);
        }
        else if(x===""){
            return " ";
        }
        else{
            return x;
        }
    });

    let text = arr3.join("").replace(/\s\s+/g, ' ');
    document.getElementById("output").value = text;

}

function generateKey(str,key)
{

    key=key.split("");
    if(str.length == key.length)
        return key.join("");
    else
    {
        let temp=key.length;
        for (let i = 0;i<(str.length-temp) ; i++)
        {

            key.push(key[i % ((key).length)])
        }
    }
    return key.join("");
}




function isLetter (str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i)
}


function isUpperCase (character) {
    if (character === character.toUpperCase()) {
        return true
    }
    if (character === character.toLowerCase()) {
        return false
    }
}


function text2vigenere() {
    let result = ''
    let message = document.getElementById("input").value;
    let key = 'nwfwiof';

    for (let i = 0, j = 0; i < message.length; i++) {
        const c = message.charAt(i)
        if (isLetter(c)) {
            if (isUpperCase(c)) {
                result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
            } else {
                result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
            }
        } else {
            result += c
        }
        j = ++j % key.length
    }
    document.getElementById("output").value = result;
}


function vigenere2text() {
    let result = ''
    let message = document.getElementById("input").value;
    let key = 'nwfwiof';

    for (let i = 0, j = 0; i < message.length; i++) {
        const c = message.charAt(i)
        if (isLetter(c)) {
            if (isUpperCase(c)) {
                result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
            } else {
                result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
            }
        } else {
            result += c
        }
        j = ++j % key.length
    }
    document.getElementById("output").value = result;
}