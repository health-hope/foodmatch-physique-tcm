import { RSAKey, KEYUTIL, hex2b64 } from 'jsrsasign';
/* rsa签名 */

const doSign = function (signData, privateKey, hashAlg) {
    var rsa = new RSAKey(); // 新建RSA对象
    // var rsa = new RSAKey(); // 新建RSA对象
    rsa = KEYUTIL.getKey(privateKey); // 设置私钥
    hashAlg = hashAlg || 'sha256'; // 设置sha1
    var hSig;
    if (rsa.signString) { // rsa在不同版本有不同方法。。
        hSig = rsa.signString(signData, hashAlg); // 加签
        hSig = hex2b64(hSig); // hex 转 b64
    } else if (rsa.sign) {
        hSig = rsa.sign(signData, hashAlg); // 加签
        hSig = hex2b64(hSig); // hex 转 b64
    }

    return hSig;
}

export default doSign
