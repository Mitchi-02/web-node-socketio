export default class GlobalError extends Error {
  constructor(
    public message: string = 'Something went wrong',
    public status: number = 500,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public errors: any = null
  ) {
    super(message)
    this.name = 'GlobalError'
    this.status = status
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}
