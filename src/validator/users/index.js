const { UserPayloadSchema } = require("./schema")

// fungsi validator
// Fungsi validateUserPayload merupakan fungsi yang dibuat untuk memvalidasi data payload (dari parameternya) berdasarkan UserPayloadSchema yang sudah kita buat di schema.js. Bila objek payload tidak sesuai dengan skema yang sudah kita tetapkan, maka fungsi tersebut akan membangkitkan InvariantError.
const UsersValidator = {
    validateUserPayload: (payload) => {
        const validationResult = UserPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = UsersValidator;