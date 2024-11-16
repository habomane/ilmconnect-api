export class HttpResponse {
    status: number;
    message: string;
    response?: object

    constructor(status : number, message : string, body? : object){
        this.status = status;
        this.message = message;
        this.response = body;
    }
}