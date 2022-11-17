module.exports = class InteractionError extends Error {
  constructor(message, e) {
    super(message);
    this.name = "InteractionError";
    this.message = message;
    this.stack = e?.stack;
  }
}