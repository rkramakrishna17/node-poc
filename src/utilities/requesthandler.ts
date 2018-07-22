import * as http from 'http';
import * as url from 'url';
import { StringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';

export class RequestHandler {

    parseIncommingRequestURL = (req: http.ServerRequest, res: http.ServerResponse) => {

        let parsedUrl = url.parse(req.url || "", true);

        let path = parsedUrl.path || "";
        let trimmedPath = path.replace(/^\/+|\/+$/g, '');
        let query = parsedUrl.query;
        let method = req.method;
        let headers = req.headers;

        let decoder = new StringDecoder('utf-8');
        let dataBuffer = "";

        /**
         * listening to the data receiving from server
         */
        req.on('data', (data: Buffer) => {
            dataBuffer += decoder.write(data);
        })

        /**
         * handling post data recieve
         */
        req.on('end', () => {
            dataBuffer += decoder.end();
            let dataCollected = {
                path: trimmedPath,
                query: query,
                headers: headers,
                method: method || "",
                payload: dataBuffer,
            }
            this.handleRequest(dataCollected, res);
        })
    }

    /**
     * handling the route
     */
    handleRequest = (dataCollected: { path: string, query: ParsedUrlQuery, headers: http.IncomingHttpHeaders, method: string, payload: string }, response: http.ServerResponse) => {
        response.end();
    }

}
