import { ResponseHandlerService } from '../../services/responsehandler.service';
import { UtilsService } from '../../services/utils.service';
import { User } from '../user/user.model';
import { Events } from './../../services/events.service';
import { Session } from './session.model';
import { SessionService } from './session.service';

export class SessionController {

    private _sessionService = new SessionService();
    private _utilsService = new UtilsService();
    private _responseHandler = new ResponseHandlerService();
    private _eventEmitter = Events.event;

    login = (requestData: any, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._sessionService.checkLoginInfo(requestData.payload, (res: User) => {
            this.checkExistingSession(requestData, res, s, f);
        }, f)
    }

    /**
     * check if existing session
     */
    checkExistingSession = (requestData: any, userData: User, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._sessionService.checkIfSessionAlreadyExists({
            userId: userData._id,
        }, (sessionObject: Session) => {
            if (sessionObject && Object.keys(sessionObject).length > 0) {
                if (requestData.headers['x-token'] !== sessionObject.token || requestData.headers['x-key'] !== sessionObject.key) {
                    this._responseHandler.invalidData({
                        "error": "session expired, login again to continue"
                    }, f);
                    /**
                     * @TODO: Need to remove the stored session object
                     */
                    this._eventEmitter.emit('deleteSessionRecord', sessionObject);
                } else {
                    this._sessionService.returnSessionObject(userData, sessionObject, s);
                }
            } else {
                this.createSession(userData, requestData, s, f);
            }
        }, f);
    }

    createSession = (userData: User, requestData: any, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        let session = new Session({
            createdTime: Date.now(),
            token: requestData.headers['x-token'],
            updatedTime: Date.now(),
            userId: userData._id,
            key: this._utilsService.guid(5),
        })
        this._sessionService.createSession(session, (sessionObject: Session) => {
            this._sessionService.returnSessionObject(userData, sessionObject, s);
        }, f);
    }

}
