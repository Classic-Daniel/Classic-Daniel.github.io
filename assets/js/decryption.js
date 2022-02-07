// console.log("decryption ran")

// var iv  = CryptoJS.enc.Utf8.parse('1583288699248111');
// var key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
// var encryptedText = document.getElementById("todos").innerHTML;

// //Decode from text    
// var cipherParams = CryptoJS.lib.CipherParams.create({
//      ciphertext: CryptoJS.enc.Base64.parse(encryptedText )
// });
// var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, { iv: iv});
// console.log(decryptedFromText.toString(CryptoJS.enc.Utf8));

// // document.getElementById("todos").innerHTML = decryptedText;

var encryptedText = document.getElementById("todos").innerHTML;
console.log("Decryption");
// console.log(encryptedText);

// var encryptedAES = CryptoJS.AES.encrypt("MessageInOUT", "b75524255a7f54d2726a951bb39204df");
var decryptedBytes = CryptoJS.AES.decrypt(encryptedText, "mindlikewater");
var plaintext = decryptedBytes.toString(CryptoJS.enc.ascii);
// console.log(encryptedText);
console.log(plaintext);