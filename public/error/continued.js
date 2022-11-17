module.exports = class Continued extends Error {
  constructor(message) {
    super(message); 
    this.name = "continued"; 
    this.message = message;
  }
}