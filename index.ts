type StatusCodes = 200 | 401 | 404 | 406 | 409 | 410 | 417 | 418 | 500;

class Status<Code extends StatusCodes = 500> extends Error {
  statusCode: Code;
  /**
   * Status: extends Error to include statusCode property for use with HTTP
   * responses.
   * @param message `string` describing the status
   * @param statusCode `number` representing HTTP-equivalent status code
   * @param stack (optional) `string` of the stack trace
   */
  constructor(message: string, statusCode: Code, stack?: string) {
    super(message);
    this.statusCode = statusCode ?? 500;
    this.stack = stack ?? (new Error(message)).stack;
  }
  toString() {
    if (this.message === '') {
      return `[${this.statusCode} Status]`;
    }
    return this.message;
  }
}

Status.prototype.name = 'Status';

/**
 * Generate a wrapper function used to create `Status` objects with a specified
 * code.
 * @param statusCode HTTP-equivalent status code
 */
const invoke = <Code extends StatusCodes>(statusCode: Code) => {
  /**
   * Create a new `Status` object with appropriate statusCode
   * @param message `string` describing the status or an existing `Error` object
   */
  const makeStatus = (message: string | Error) => {
    if (typeof message !== 'undefined' && message instanceof Error) {
      return new Status<Code>(message.message, statusCode, message.stack);
    }
    return new Status<Code>(message, statusCode);
  };
  makeStatus.statusCode = statusCode;
  return makeStatus;
};

export default Status;
export const ok = invoke(200);
export const auth = invoke(401);
export const notfound = invoke(404);
export const invalid = invoke(406);
export const duplicate = invoke(409);
export const expired = invoke(410);
export const incomplete = invoke(417);
export const human = invoke(418);
export const general = invoke(500);
