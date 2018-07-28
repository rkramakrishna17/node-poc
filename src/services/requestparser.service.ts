import * as http from 'http';
import { StringDecoder } from 'string_decoder';
import * as url from 'url';

import { RouterService } from './router.service';
import { UtilsService } from './utils.service'
import { ResponseInterface } from '../interfaces/successresponse.interface';

export class RequestParserService {

    /**
     * declaring class variables
     */
    private _router = new RouterService().routes;
    private _utils = new UtilsService();

    /**
     * parse incomming url and execute respective controller
     */
    parseIncommingRequestURL = (req: http.ServerRequest, res: http.ServerResponse) => {

        req.headers['x-token'] = req.headers['x-token'] || this._utils.guid();
        res.setHeader('x-token', req.headers['x-token'] || this._utils.guid());
        /**
         * gathering required data
         */
        let parsedUrl = url.parse(req.url || "", true);
        let path = parsedUrl.path || "";
        let trimmedPath = path.replace(/^\/+|\/+$/g, '');
        let queryParams = parsedUrl.query || {};
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
            let requestData = {
                path: trimmedPath,
                queryParams: queryParams,
                headers: headers,
                method: method || "",
                payload: JSON.parse(dataBuffer),
                params: {},
            }
            this.handleRequest(requestData, res);
        })
    }

    /**
     * handling the route
     */
    handleRequest = (requestData: any, response: http.ServerResponse) => {
        let controller = requestData && requestData !== undefined && this.getControllerByPath(requestData);

        if (controller) {
            /**
             * the selected path exists
             */
            try {
                controller(requestData, (controllerResponse: ResponseInterface) => {
                    response.statusCode = 200;
                    if (controllerResponse.headers) {
                        for (let key in controllerResponse.headers) {
                            response.setHeader(key, controllerResponse.headers[key]);
                        }
                    }
                    /**
                     * ending the response with a success callback
                     */
                    response.end(JSON.stringify(controllerResponse.body));
                }, (controllerFailure: { statusCode?: number, body?: object }) => {
                    response.statusCode = controllerFailure.statusCode || 500;
                    /**
                     * ending the response with failure callback
                     */
                    // console.log(controllerFailure.body);
                    response.end(JSON.stringify(controllerFailure.body || {
                        'error': 'Failed due to server error',
                    }));
                });
            } catch (e) {
                response.statusCode = 500;
                console.log(e);
                response.end(JSON.stringify({ 'error': 'Failed due to server error' }));
            }
        } else {
            /**
             * handle no route found
             */
            response.statusCode = 404;
            response.end(JSON.stringify({ 'error': 'resource not found' }));
        }
    }

    /**
     * parse path to get the controller
     */
    getControllerByPath = (requestData: any) => {
        let splittedPath = requestData.path.split('/');
        let params = requestData.params;
        let route = this.deepSearchRoute(splittedPath, 0, this._router, params);
        return route && route.controller;
    }

    /**
     * digging inside route handler
     */
    deepSearchRoute = (splittedPath: Array<string>, index: number, routes: any, params: any) => {
        let route = routes[splittedPath[index]];
        let routesContainDynamicId = this.checkIfDynamicRouteExists(routes);
        if (route) {
            /**
             * check if any extra route exists
             */
            if (splittedPath[index + 1]) {
                /**
                 * deep search again to get the underlying route
                 */
                route = this.deepSearchRoute(splittedPath, index + 1, route.childRoutes, params);
                if (route) {
                    return route;
                }
            } else {
                /**
                 * current route is the selected route. so continuing to return route
                 */
            }
        } else if (routesContainDynamicId) {
            /**
             * if this split path at index doesnt exist then check if the routes contain any dynamic route
             */
            let nextIndexExists = splittedPath[index + 1];
            if (nextIndexExists) {
                /**
                 *
                 */
                for (let key in routes) {
                    if (key.indexOf(':') > (-1)) {
                        route = this.deepSearchRoute(splittedPath, index + 1, routes[key].childRoutes, params);
                        if (route) {
                            params[routes[key].dynamicIdKey] = splittedPath[index];
                            break;
                        }
                    }
                }
            } else {
                /**
                 * else there must be only only child and that is the selected route by route design
                 */
                route = routes && routes[Object.keys(routes) && Object.keys(routes)[0]] && routes[Object.keys(routes)[0]];
                params[route && route.dynamicIdKey] = splittedPath[index];
            }
        }
        return route;
    }

    /**
     * checks if the routes contain only dynamic ids as paths
     */
    checkIfDynamicRouteExists = (routes: any) => {
        let dynamicRouteExists = false;
        for (let key in routes) {
            if (key.indexOf(':') > (-1)) {
                dynamicRouteExists = true;
                break;
            }
        }
        return dynamicRouteExists;
    }

}
