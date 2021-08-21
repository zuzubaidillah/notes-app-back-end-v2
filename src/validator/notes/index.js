// // berkas index.js akan fokus dalam membuat fungsi sebagai validator yang menggunakan schema dari schema.js
// const InvariantError = require('../../exceptions/InvariantError');
// const { NotePayloadSchema } = require('./schema');

// const NotesValidator = {
//     // Fungsi validateNotePayload ini nantinya akan berguna untuk melakukan validasi dan mengevaluasi apakah validasi itu berhasil atau tidak.
//     validateNotePayload: (payload) => {
//         // kode validasi Joi dalam memvalidasi payload di dalam fungsi ini. Manfaatkan schema dari NotePayloadSchema yang sudah kita buat sebelumnya
//         const validationResult = NotePayloadSchema.validate(payload);

//         // kita evaluasi validationResult. Jika properti error tidak undefined, maka kita bangkitkan error dengan membawa pesan dari properti validationResult.error.message
//         if (validationResult.error) {
//             throw new InvariantError(validationResult.error.message);
//         }
//     }
// }

// module.exports = NotesValidator;
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    },
};

module.exports = NotesValidator;