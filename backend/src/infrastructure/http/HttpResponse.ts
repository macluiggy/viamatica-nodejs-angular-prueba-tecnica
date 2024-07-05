/**
 * Represents the response of an HTTP request either successful or not
 */
export default class HttpResponse {
  statusCode: number;
  message: string;
  data: any;
  /**
   * Whether the request was successful or not
   */
  isOk: boolean;
  constructor({
    statusCode,
    message,
    data,
    isOk = true,
  }: {
    statusCode: number;
    message: string;
    data: any;
    isOk?: boolean;
  }) {
    this.isOk = isOk;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
