class ResponseService {
  constructor(data, message, isError = false) {
    this.data = data;
    this.message = message;
    this.status = isError ? "failed" : "success";
  }
}

module.exports = ResponseService