/**
 * importing dependencies
 */
import { ResponseHandlerService } from './../../services/responsehandler.service';

export class UserController {

    _responseHandler = new ResponseHandlerService();

    allowedUsersMethods = ['GET'];
    allowedUserRelatedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    /**
     * common request handler for all users related operations
     * arguments are clientRequestData, success callback and failure callback
     */
    handleUsers = (requestData: any, s: any, f: any) => {
        let method = requestData.method;
        if (this.allowedUsersMethods.indexOf(method) > (-1)) {
            s({
                'success': 'method found',
            })
        } else {
            this._responseHandler.methodNotFound(f);
        }
    }

    /**
     * common request handler for all user specific operations
     */
    handleUser = (requestData: any, s: any, f: any) => {
        s(requestData);
    }

    /**
     * controller for path: '/users' method: 'GET
     */
    getUsers = () => {

    }

}
