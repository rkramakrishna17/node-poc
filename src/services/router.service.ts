import { PingController } from "../controllers/ping/ping.controller";
import { UserController } from "../controllers/user/user.controller";

export class RouterService {

    pingController = new PingController();
    userController = new UserController();

    routes = {
        'ping': {
            'controller': this.pingController.checkPing,
            'authorization': false,
        },
        'users': {
            'controller': this.userController.handleUsers,
            'authorization': true,
            'childRoutes': {
                ':id': {
                    'controller': this.userController.handleUser,
                    'dynamicIdKey': 'userId',
                    'authorization': true
                },
            }
        }
    }

}


