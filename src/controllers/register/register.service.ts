import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ResponseHandlerService } from '../../services/responsehandler.service';

export class RegisterService {

    private _userService = new UserService();
    private _responseHandlerService = new ResponseHandlerService;

    registerUser = (data: User, s: (...args: any[]) => void, f: (...args: any[]) => void): void => {
        let userObject: User = new User(data);
        this._userService.checkUserExists(userObject, (res) => {
            if (res === true) {
                this._responseHandlerService.invalidData({
                    "errors": "User already exists",
                }, f);
            } else {
                this._userService.submitUser(data, (response: any) => {
                    s(response);
                }, f);
            }
        }, (res) => {
            throw ("Failed due to server error");
        })
    };

}
