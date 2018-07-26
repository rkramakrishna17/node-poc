
export class ResponseHandlerService {

    methodNotFound = (failureCallback: any, body?: object, message?: string) => {
        let data = {
            statusCode: 404,
            body: body || {
                'error': message || 'Method not found',
            }
        }
        failureCallback(data);
    }
}
