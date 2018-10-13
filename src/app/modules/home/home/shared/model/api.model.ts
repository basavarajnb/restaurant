export class ApiResponse {
    message: ApiMessage;
    data: any;
}

export class ApiMessage {
    code: number;
    text: string;
}
