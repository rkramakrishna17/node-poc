
export class UtilsService {

    static guid = (length?: number) => {
        let str = "";
        for (let i = 0; i < (length || 4); i++) {
            str += UtilsService.s4();
        }
        return str;
    };
    guid = UtilsService.guid;

    static s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(10).substring(1);
    };

}
