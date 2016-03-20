
export class UnknownError {
  static messages = [];

  code = 500;

  constructor(message = null) {
    const { messages } = this.constructor;
    this.message = message || messages[Math.floor(Math.random()*messages.length)];
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

export class NotFoundError extends UnknownError {
  code = 404;

  static messages = [
    'I looked really hard, but I could not find it, sowwy.',
    'It is simply not here.',
    'I am not the oracle, I do not know where it is!'
  ];
}

export class AccessDeniedError extends UnknownError {
  code = 403;

  static messages = [
    'Can\'t touch this!',
    'Hammer time!'
  ];
}
