export class Exception {
  static messages = [];

  constructor(message = null) {
    const { messages } = this.constructor;
    this.message = message || messages[Math.floor(Math.random()*messages.length)];
    this.code = this.constructor.name;
  }
}

export class NotFoundException extends Exception {
  static messages = [
    'I looked really hard, but I could not find it, sowwy.',
    'It is simply not here.',
    'I am not the oracle, I do not know where it is!'
  ];
}

export class AccessDeniedException extends Exception {
  static messages = [
    'Can\'t touch this!',
    'Hammer time!'
  ];
}
