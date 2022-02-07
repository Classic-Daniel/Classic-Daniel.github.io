var aes = require("./aes.js");

var htmlText = ``;
key = ""
var originalText = htmlText

const encryptWithAES = (text) => {
  const passphrase = key;
  return aes.CryptoJS.AES.encrypt(text, passphrase).toString();
};

var cryptText = encryptWithAES(originalText)
console.log(cryptText)

// const decryptWithAES = (ciphertext) => {
//     const passphrase = key;
//     const bytes = aes.CryptoJS.AES.decrypt(ciphertext, passphrase);
//     const originalText = bytes.toString(aes.CryptoJS.enc.Utf8);
//     return originalText;
//   };
// console.log(decryptWithAES(cryptText))