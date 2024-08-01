class ResponseModel {
  success: boolean;
  message: string;
  code: number;
  data: any;

  constructor(message: string, code: number, data: any = null) {
    this.success = code >= 200 && code < 300;
    this.message = message;
    this.code = code;
    this.data = data;
  }

  static success(data: any, message = "Request was successful", code = 200) {
    return new ResponseModel(message, code, data);
  }

  static error(message = "An error occurred", code = 500) {
    return new ResponseModel(message, code);
  }
}

export default ResponseModel;
