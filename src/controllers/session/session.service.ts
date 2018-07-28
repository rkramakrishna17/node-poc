import { MongoService } from '../../data/mongocontroller/mongo.service';
import { ResponseHandlerService } from '../../services/responsehandler.service';
import { UtilsService } from '../../services/utils.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Session } from './session.model';

export class SessionService {

    private _responseHandler = new ResponseHandlerService();
    private _userService = new UserService();
    private _utilsService = new UtilsService();
    private _mongoService = new MongoService();

    private tableName = 'session';

    /**
     * check user given data
     */
    checkLoginInfo = (data: any, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        let userObject = new User(data);
        let errorCount = 0;
        if (!userObject.emailId && userObject.emailId.trim().length === 0) {
            errorCount++;
        }
        if (!userObject.password && userObject.password.trim().length === 0) {
            errorCount++;
        }
        if (errorCount > 0) {
            this._responseHandler.invalidData({
                "errors": "Enter valid credentials",
            }, f);
        } else {
            this.checkUserCredentials(userObject, s, f);
        }
    }

    /**
     * validate user given credentials
     */
    checkUserCredentials = (data: User, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._userService.getUserByQuery({
            emailId: data.emailId,
        }, (res: User) => {
            if (res && Object.keys.length > 0) {
                let encryptedPassword = this._utilsService.crypto(data.password.trim());
                if (encryptedPassword === res.password) {
                    s(res);
                } else {
                    this._responseHandler.invalidData({
                        "errors": 'Enter valid credentials',
                    }, f);
                }
            } else {
                this._responseHandler.invalidData({
                    "errors": 'Enter valid credentials',
                }, f);
            }
        }, (res) => {
            this._responseHandler.invalidData({
                "errors": 'Failed due to server error',
            }, f);
        })
    }

    /**
     * check if session already exists
     */
    checkIfSessionAlreadyExists = (query: Session, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._mongoService.findOne(this.tableName, query, {}, s, f);
    }

    /**
     * create session
     */
    createSession = (sessionObject: Session, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._mongoService.insertOne(this.tableName, sessionObject, s, f);
    }

    /**
     * return session object
     */
    returnSessionObject = (userData: User, sessionObject: Session, s: (...args: any[]) => void) => {
        delete userData.password;
        this._responseHandler.successCallback({
            message: 'User session created',
            responseObject: { "user": userData },
            headers: {
                "x-key": sessionObject.key,
            }
        }, s);
    }

    /**
     * delete session record
     */
    deleteSessionObject = (sessionObject: Session) => {
        this._mongoService.deleteRecord(this.tableName, {
            _id: sessionObject._id,
        }, {}, (response: object) => {
            console.log("Removed session object");
        })
    }

}
