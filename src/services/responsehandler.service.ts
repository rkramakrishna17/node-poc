import { ResponseInterface } from '../interfaces/successresponse.interface';

export class ResponseHandlerService {

    checkIfMethodisAllowed = (methods: Array<string>, requestedMethod: string, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        if (methods.indexOf(requestedMethod) > (-1)) {
            s();
        } else {
            this.methodNotFound(f);
        }
    }

    methodNotFound = (failureCallback: (...args: any[]) => void, body?: object, message?: string) => {
        let data = {
            statusCode: 404,
            body: body || {
                'error': message || 'Method not allowed',
            }
        }
        failureCallback(data);
    }

    invalidData = (errors: any, failureCallback: (...args: any[]) => void) => {
        let data = {
            statusCode: 500,
            body: errors
        }
        failureCallback(data);
    }

    successCallback = (data: { message?: string, responseObject: object, headers?: object }, successCallback: (...args: any[]) => void): void => {
        let responseObject: ResponseInterface = {
            statusCode: 200,
            headers: data.headers || {},
            body: {
                message: data.message,
                response: data.responseObject,
            },
        }
        successCallback(responseObject);
    }

}
