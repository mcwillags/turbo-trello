export abstract class BaseResponse {
  public message?: string;

  withMessage(message: string) {
    this.message = message;

    return this;
  }
}
