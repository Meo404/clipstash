import Cookies from 'js-cookie';
import SimpleCrypto from "simple-crypto-js";

// TODO - Replace with env variable
const _cookieSecret = '25632035a57dae84bc5a07196f73cf9150ebd3344f0208800173083d3dd1f6'

/**
 * Function to return an js-cookie instance that will automatically
 * encrypt/decrypt cookies when setting or reading them using the _cookieSecret.
 * 
 * This will not prevent cookie content to be completely secure, but at least obfuscate it.
 * 
 * @param {boolean} isObjectContent - whether or not the cookie content is an object
 * @return js-cookie instance
 */
export default function cookieTokenizer(isObjectContent = true) {
    const simpleCrypto = new SimpleCrypto(_cookieSecret);

    return Cookies.withConverter({
        read: function (value, name) {
            return simpleCrypto.decrypt(value, isObjectContent);
        },
        write: function (value, name) {
            return simpleCrypto.encrypt(value);
        }
    })
}
