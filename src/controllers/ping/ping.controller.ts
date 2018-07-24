
export class PingController {

    allowedMethods = ['GET'];

    /**
     * handle for path: '/ping', method: 'GET
     */
    checkPing = (requestData: any, s: any, f: any) => {
        s({ 'success': 'working successfully' });
    }

}
