/**
 * importing dependencies
 */
import { ResponseHandlerService } from '../../services/responsehandler.service';

export class UserController {

    private _responseHandler = new ResponseHandlerService();

    private allowedUsersMethods = ['GET'];
    private allowedUserRelatedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    /**
     * common request handler for all users related operations
     * arguments are clientRequestData, success callback and failure callback
     */
    handleUsers = (requestData: any, s: any, f: any) => {
        this._responseHandler.checkIfMethodisAllowed(this.allowedUsersMethods, requestData.method, (): any => {
            s({
                success: 'Method exists',
            })
        }, f);
    }

    /**
     * common request handler for all user specific operations
     */
    handleUser = (requestData: any, s: any, f: any) => {
        this._responseHandler.checkIfMethodisAllowed(this.allowedUserRelatedMethods, requestData.method, (): any => {
            s({
                success: 'Method exists',
            })
        }, f);
    }

    /**
     * controller for path: '/users' method: 'GET
     */
    getUsers = () => {

    }

}
