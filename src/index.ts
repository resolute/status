// WARNING: Edge supports this basic implementation of rest paramaters. However,
// Edge does NOT support more complex destructuring, so avoid it in scripts that
// may be used on the frontend.

class Status extends Error {
    statusCode: number;
    // [statusCode: string]: number;
    constructor(statusCode = 500, ...params: any[]) {
        super(...params);
        this.statusCode = statusCode;
        // if (typeof Error.captureStackTrace === 'function') {
        //     Error.captureStackTrace(this, this.constructor);
        // } else {
        this.stack = (new Error(...params)).stack;
        // }
    }
    toString() {
        return this.message;
    }
}

Status.prototype.name = 'Status';

const invoke = (statusCode: number) => {
    const fn = (...params: any[]) => {
        if (typeof params[0] !== 'undefined' && params[0] instanceof Status) {
            return params[0];
        }
        return new Status(statusCode, ...params);
    }
    fn.statusCode = statusCode;
    return fn;
}

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