import * as Crypto from 'crypto';

export class User {

    name: string;

    password: string;

    _id: string;

    emailId: string;

    phoneNumber: string;

    address: string;

    createdTimeStamp?: number;

    updatedTimeStamp?: number;

    constructor (userObject: any) {

        this.name = userObject && userObject.name;
        this.password = userObject && userObject.password;
        this._id = userObject && userObject._id;
        this.emailId = userObject && userObject.emailId;
        this.phoneNumber = userObject && userObject.phoneNumber;
        this.address = userObject && userObject.address;
        this.createdTimeStamp = userObject && userObject.createdTimeStamp;
        this.updatedTimeStamp = userObject && userObject.updatedTimeStamp;
    }

}
