import { ResponseHandlerService } from '../../services/responsehandler.service';
import { RegisterService } from './register.service';

export class RegisterController {

    private _responseHandler = new ResponseHandlerService();
    private _registerService = new RegisterService();

    register = (requestData: any, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._responseHandler.checkIfMethodisAllowed(['POST'], requestData.method, (): any => {
            this._registerService.registerUser(requestData.payload, (response: any) => {
                this._responseHandler.successCallback({
                    message: "User registered successfully",
                    responseObject: response
                }, s);
            }, (error: any) => {
                this._responseHandler.invalidData(error, f);
            })
        }, f);
    }

}
