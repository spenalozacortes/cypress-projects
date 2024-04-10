const letters = 'abcdefghijklmnopqrstuvwxyz';
const digits = '1234567890';

class Utils {
    static generateRandomInt(range) {
        return Math.floor(Math.random() * range);
    }
      
    static generateRandomString(length) {
        let result = '';
      
        for (let i = 0; i < length; i++) {
          result += letters.charAt(Utils.generateRandomInt(letters.length));
        }
      
        return result;
    }
      
    static generateRandomPassword(length, email) {
        let result = '';
      
        result += email.charAt(Utils.generateRandomInt(email.length));
        result += digits.charAt(Utils.generateRandomInt(digits.length));
        result += letters.charAt(Utils.generateRandomInt(letters.length)).toUpperCase();
        result += Utils.generateRandomString(length - result.length);
      
        return result;
    }
}

export default Utils;
