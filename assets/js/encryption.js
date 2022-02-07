var aes = require("./aes.js");

var iv  = aes.CryptoJS.enc.Utf8.parse('1583288699248111');
var key = aes.CryptoJS.enc.Utf8.parse('mindlikewater');
var text = `<div class="col-lg-6">
<div class="resume-item pb-0">
  <h4>Games/Interactive Experiences</h4>
  <p>
  <ul>
    <li>Dance Dance Revolution with an Inflatable tube man (in the spirit of QWERTY)</li>
    <li>Dandellion shaped like a human face. The task is to blow the face away.</li>
    <li>Wack-a-mole game in the style of Jan Švankmajer</li>
    <li>Stagedive simulator</li>
    <li>Dental care for giant through the use of cannons</li>
    <li>Webcamera follows face. Covers it in hair. When the hair moves out, a void appears in place of a face</li>
  </ul>
  </p>
</div>
<div class="resume-item pb-0">
  <h4>3D Sculpts/Models</h4>
  <p>
  <ul>
    <li>Biblically accurate angels</li>
    <li>Dioramas of lighthouses</li>
    <li>Dioramas of asylums trying hard not to be depressing</li>
    <li>Metro station</li>
    <li>Ren and Stimpy</li>
    <li>Actually scary scarecrow</li>
    <li>Forest witch encountered in Massachusettes</li>
    <li>Bestiary</li>
  </ul>
  </p>
</div>
<div class="resume-item pb-0">
  <h4>Video/Animation</h4>
  <p>
  <ul>
    <li>Slowly moving person with the clouds flying by fast in the background</li>
    <li>Bigfoot encounter video, but the bigfoot turns into a glitch</li>
    <li>Cinemagraph</li>
  </ul>
  </p>
</div>
<div class="resume-item pb-0">
  <h4>Photo/Drawing</h4>
  <p>
  <ul>
    <li>Mosaic of my face made up of photos of my face</li>
    <li>Coin with a picture of me begging for money</li>
    <li>Series of drawing of artifical words at the moment when the last piece is put in place</li>
    <li>Torture devices to encourage studying</li>
  </ul>
  </p>
</div>
<div class="resume-item pb-0">
  <h4>Other</h4>
  <p>
  <ul>
    <li>Chrome extension extracting every haiku from a page</li>
    <li>ASMR video with darkweb audiences in mind (Sad Satan)</li>
  </ul>
  </p>
</div>
</div>`;

var encryptedCP = aes.CryptoJS.AES.encrypt(text, key, { iv: iv });
var decryptedWA = aes.CryptoJS.AES.decrypt(encryptedCP, key, { iv: iv});
var cryptText = encryptedCP.toString();
console.log(cryptText);
// console.log(decryptedWA.toString(aes.CryptoJS.enc.Utf8));

//Decode from text    
var cipherParams = aes.CryptoJS.lib.CipherParams.create({
     ciphertext: aes.CryptoJS.enc.Base64.parse(cryptText )
});
var decryptedFromText = aes.CryptoJS.AES.decrypt(cipherParams, key, { iv: iv});
console.log(decryptedFromText.toString(aes.CryptoJS.enc.Utf8));