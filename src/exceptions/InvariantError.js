const ClientError = require("./ClientError");

// Lanjut ke berkas InvariantError.js. Buat class dengan nama InvariantError yang mewarisi class ClientError dan buat constructor yang menerima satu parameter bernama message
class InvariantError extends ClientError {
    constructor(message) {
        // Di dalam constructor, panggil fungsi super dengan membawa nilai message dan tetapkan this.name dengan nilai “InvariantError”
        // Karena InvariantError memiliki status code 400, maka kita tidak perlu menetapkan status code di sini. Sebab secara default, turunan ClientError akan memiliki nilai status code 400.
        super(message);
        this.name = 'InvariantError';
    }
}

module.exports = InvariantError;