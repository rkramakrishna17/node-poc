/**
 * importing dependencies
 */
import * as http from "http";
import { RequestHandler } from './utilities/requesthandler';

class ServerApp {

    server: any;
    RequestHandler = new RequestHandler();

    constructor () {

        /**
         * starting a server
         */
        this.server = http.createServer((req: http.ServerRequest, res: http.ServerResponse) => {

            /**
             * received a request
             */
            console.log("Received a request");

            /**
             * handling the request
             */
            res.setHeader('Content-Type', 'json');
            res.statusCode = 200;
            this.RequestHandler.parseIncommingRequestURL(req, res);
        });

        /**
         * start listening on the server
         */
        this.startListening();
    }

    startListening = () => {
        this.server.listen('3000', () => {
            console.log("Server listening on 3000 port");
        })
    }

}

new ServerApp();
