let md5 = require('blueimp-md5');
let sha1 = require('js-sha1');
let sha256 = require('js-sha256');
let sha512 = require('js-sha512');

class Hash_Passwords {
    md5_(password){
        return md5(password);
    }
    sha1(password){
        return sha1(password);
    }
    sha256(password){
        return sha256(password);
    }
    sha512(password){
        return sha512(password);
    }
}

const Hash = new Hash_Passwords();
console.log(Hash.md5_('secret')) // 5ebe2294ecd0e0f08eab7690d2a6ee69
console.log(Hash.sha1('secret')) // e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4
console.log(Hash.sha256('secret')) // 2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b
console.log(Hash.sha512('secret')) // bd2b1aaf7ef4f09be9f52ce2d8d599674d81aa9d6a4421696dc4d93dd0619d682ce56b4d64a9ef097761ced99e0f67265b5f76085e5b0ee7ca4696b2ad6fe2b2