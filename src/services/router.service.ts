import { PingController } from "../controllers/ping/ping.controller";
import { UserController } from "../controllers/user/user.controller";
import { RegisterController } from "../controllers/register/register.controller";
import { SessionController } from "../controllers/session/session.controller";

export class RouterService {

    private _pingController = new PingController();
    private _userController = new UserController();
    private _registerController = new RegisterController();
    private _sessionController = new SessionController();


    routes = {
        'api': {
            /**
             * here all the api related routes are present
             */
            'childRoutes': {
                'ping': {
                    'controller': this._pingController.checkPing,
                    'authorization': false,
                },
                'register': {
                    'controller': this._registerController.register,
                    'authorization': false,
                },
                'login': {
                    'controller': this._sessionController.login,
                    'authorization': false,
                },
                'users': {
                    'controller': this._userController.handleUsers,
                    'authorization': true,
                    'childRoutes': {
                        ':id': {
                            'controller': this._userController.handleUser,
                            'dynamicIdKey': 'userId',
                            'authorization': true
                        },
                    }
                }
            }
        }
    }

}


