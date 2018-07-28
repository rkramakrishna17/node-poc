
export class Session {

    _id?: string;

    token?: string;

    key?: string;

    userId?: string;

    createdTime?: number;

    updatedTime?: number;

    constructor (sessionObject: Session) {

        this._id = sessionObject && sessionObject._id;
        this.token = sessionObject && sessionObject.token;
        this.key = sessionObject && sessionObject.key;
        this.userId = sessionObject && sessionObject.userId;
        this.createdTime = sessionObject && sessionObject.createdTime || Date.now();
        this.updatedTime = sessionObject && sessionObject.updatedTime || Date.now();

    }

}
