
export class ResponseHandlerService {

    checkIfMethodisAllowed = (methods: Array<string>, requestedMethod: string, s: (...args: any[]) => {}, f: (...args: any[]) => {}) => {
        if (methods.indexOf(requestedMethod) > (-1)) {
            s();
        } else {
            this.methodNotFound(f);
        }
    }

    methodNotFound = (failureCallback: (...args: any[]) => {}, body?: object, message?: string) => {
        let data = {
            statusCode: 404,
            body: body || {
                'error': message || 'Method not allowed',
            }
        }
        failureCallback(data);
    }

}
