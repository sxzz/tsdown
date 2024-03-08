export class PrettyError extends Error {
  constructor(message: string) {
    super(message)
    // eslint-disable-next-line unicorn/custom-error-definition
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
