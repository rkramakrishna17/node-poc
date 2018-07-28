/**
 * importing dependencies
 */
import { ResponseHandlerService } from '../../services/responsehandler.service';

export class PingController {

    /**
     * initializing imports
     */
    _responseHandler = new ResponseHandlerService();

    allowedMethods = ['GET'];

    /**
     * handle for path: '/ping', method: 'GET
     */
    checkPing = (requestData: any, s: any, f: any) => {
        this._responseHandler.checkIfMethodisAllowed(this.allowedMethods, requestData.method, (): any => {
            s({
                body: {
                    message: 'Server is running',
                }
            })
        }, f);
    }

}
