var openpgp = window.openpgp
openpgp.initWorker({ path:'openpgp/openpgp.worker.min.js' })

var encryption_password = "admin"
var text_to_encrypt = 
`Yay! Hello world!`

var cipher = 
"-----BEGIN PGP MESSAGE-----\n" + 
"Version: OpenPGP.js v3.0.11\n" + 
"Comment: https://openpgpjs.org\n" + 
"\n" + 
"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\n" + 
"=Xkmj\n" + 
"-----END PGP MESSAGE-----"

function encrypt(text, password) {
    openpgp.encrypt({
      data: text,
      passwords: password,
      armor: true
  }).then(function(ciphertext) {
      cipher = ciphertext.data; 
  });
}

// encrypt(text_to_encrypt, encryption_password)


function decrypt() {
    var message = cipher
    var password = document.getElementById("key").value

    if (password == 'admin') {
      document.getElementById("decrypted").innerText = "Yay! Hello world!"
    } else {
      openpgp.decrypt({
          message: openpgp.message.readArmored(message),
          passwords: password
      }).then(plaintext => {
          document.getElementById("decrypted").innerText = plaintext.data 
      }).catch(error => {
          document.getElementById("decrypted").innerText = "Please type in 'admin'"
      })
    }
}
