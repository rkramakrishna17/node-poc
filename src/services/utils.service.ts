import * as crypto from 'crypto';

export class UtilsService {

    /**
     * for creating unique id if required
     */
    static guid = (length?: number) => {
        let str = "";
        for (let i = 0; i < (length || 4); i++) {
            str += UtilsService.s4();
        }
        str = UtilsService.crypto(str);
        return str;
    };
    guid = UtilsService.guid;

    static s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(10).substring(1);
    };

    /**
     * encrpting password with sha256 algorithm
     */
    static crypto = (str: string) => {
        if (str && typeof str === 'string' && str.length > 0) {
            let encryptedPassword = crypto.createHmac('sha256', 'Test@123').update(str).digest('hex')
            return encryptedPassword;
        }
        return "";
    }
    crypto = UtilsService.crypto;

}
