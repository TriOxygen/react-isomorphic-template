
export class UnknownError {
  static messages = [];

  constructor(message = null) {
    const { messages } = this.constructor;
    this.message = message || messages[Math.floor(Math.random()*messages.length)];
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

export class NotFoundError extends UnknownError {
  static messages = [
    'I looked really hard, but I could not find it, sowwy.',
    'It is simply not here.',
    'I am not the oracle, I do not know where it is!'
  ];
}

export class AccessDeniedError extends UnknownError {
  static messages = [
    'Can\'t touch this!',
    'Hammer time!'
  ];
}
