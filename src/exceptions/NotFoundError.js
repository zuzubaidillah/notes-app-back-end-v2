const ClientError = require('./ClientError');

// buat class NotFoundError yang mewarisi ClientError dan buat constructor yang menerima parameter bernama message
class NotFoundError extends ClientError {
    constructor(message) {
        // panggil fungsi super dengan membawa nilai message dan 404 sebagai statusCode; tetapkan this.name dengan nilai “NotFoundError”; dan jangan lupa ekspor class NotFoundError
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;