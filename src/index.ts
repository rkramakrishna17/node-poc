/**
 * importing dependencies
 */
import * as http from "http";
import { RequestParserService } from './services/requestparser.service';
import { WorkersService } from './services/workers.service';

class ServerApp {

    private server: any;
    private _requestHandler = new RequestParserService();
    private _workersService = new WorkersService();

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
            this._requestHandler.parseIncommingRequestURL(req, res);
        });

        /**
         * start listening on the server
         */
        this.startListening();
    }

    startListening = () => {
        /**
         * start server
         */
        this.server.listen('3000', () => {
            console.log("Server listening on 3000 port");
        })

        /**
         * start workers
         */
        this._workersService.init();
    }

}

new ServerApp();
