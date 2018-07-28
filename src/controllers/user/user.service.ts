import { MongoService } from '../../data/mongocontroller/mongo.service';
import { UtilsService } from '../../services/utils.service';
import { User } from './user.model';

export class UserService {

    private _mongoService = new MongoService();

    private _collectionName = 'users';

    /**
     * validating user object
     */
    validateUser = (userObject: User) => {
        let errors: any = {};

        /**
         * checking user name
         */
        if (!userObject.name || userObject.name.trim().length === 0) {
            errors.name = 'Enter a valid user name';
        }

        /**
         * checking user name
         */
        if (!userObject.password || (typeof userObject.password === 'string' && userObject.password.trim().length === 0)) {
            errors.name = 'Enter a valid password';
        }

        /**
         * checking email
         */
        if (!userObject.emailId || userObject.emailId.trim().length === 0) {
            errors.emailId = 'Enter a valid email';
        }

        /**
         * checking address
         */
        if (!userObject.address || userObject.address.trim().length === 0) {
            errors.address = 'Enter a valid address';
        }

        /**
         * checking phone number
         */
        if (!userObject.phoneNumber || userObject.phoneNumber.trim().length === 0) {
            errors.phoneNumber = 'Enter a valid phone number';
        }

        return Object.keys(errors).length > 0 ? errors : true;
    }

    /**
     * check if user exixts by email Id as we are treating email id as unique
     */
    checkUserExists = (userInfo: User, s: (...args: any[]) => void, f: (...args: any[]) => void): void => {
        this.getUserByQuery({
            emailId: userInfo.emailId
        }, (res) => {
            s(res && Object.keys(res).length > 0);
        }, (res) => {
            f(res);
        })
    }

    getUserByQuery = (query: object, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._mongoService.findOne(this._collectionName, query, {}, (res) => {
            s(res);
        }, (res) => {
            f(res);
        })
    }

    /**
     * create user
     */
    submitUser = (data: User, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        let userObject: User = new User(data);
        if (userObject._id && userObject._id.length > 0) {

        } else {
            this.createUser(userObject, s, f);
        }
    }

    /**
     * createUser
     */
    private createUser = (userObject: User, s: (...args: any[]) => void, f: (...args: any[]) => void): void => {
        userObject.createdTimeStamp = Date.now();
        userObject.password = UtilsService.crypto(userObject.password);
        this._mongoService.insertOne(this._collectionName, userObject, (response) => {
            if (response.password) {
                delete response.password;
            }
            s(response);
        }, f);
    }

}
