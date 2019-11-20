const CryptoJS = require("crypto-js");

class Cipher_Class{
    encrypt(message, password){
        var encrypted = CryptoJS.AES.encrypt(message, password);
        console.log('Anyone without password can\'t read this message');
        return encrypted.toString();
    }
    decrypt(message, password){
        var bytes  = CryptoJS.AES.decrypt(message.toString(), password);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }
}

const Cipher = new Cipher_Class();
const message = Cipher.encrypt('Ini tulisan rahasia', 'p4$$w0rd')

console.log(message) // Anyone without password can't read this message

const decryptedMessage = Cipher.decrypt(message, 'p4$$w0rd')

console.log(decryptedMessage) // Ini tulisan rahasia