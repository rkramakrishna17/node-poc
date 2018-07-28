
export interface ResponseInterface {

    statusCode: number;

    headers?: any;

    body?: {

        message?: string;

        response?: object;

    }

}
