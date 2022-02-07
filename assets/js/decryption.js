const decryptWithAES = (ciphertext) => {
    const passphrase = key;
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

function decryptFail(){
    alert("Wrong Password");
}

  function runDecryption() {
      try {          
            var encryptedText = document.getElementById("todos").innerHTML.replace(/\s/g, "");
            key = document.getElementById("decryptKey").value;
            
            console.log("Decryption started...");
            decryptedText = decryptWithAES(encryptedText);
            
            if(decryptedText.startsWith("<div")){
                document.getElementById("todos").innerHTML = decryptedText;
                document.getElementById("todos").classList = {};
                document.getElementById("decryptForm").style.display = "none";
            }else
            {
                decryptFail();
            }
      } catch (error) {
        decryptFail();
      }
  }