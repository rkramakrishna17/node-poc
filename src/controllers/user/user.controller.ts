
export class UserController {

    allowedUsersMethods = ['GET'];
    allowedUserRelatedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    /**
     * common request handler for all users related operations
     * arguments are clientRequestData, success callback and failure callback
     */
    handleUsers = (requestData: any, s: any, f: any) => {
        s(requestData);
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
