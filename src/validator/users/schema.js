// Berkas schema.js akan digunakan untuk fokus membuat dan menuliskan objek schema data notes

const Joi = require("joi");

const NotePayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

// ekspor nilai NotePayloadSchema agar dapat digunakan pada berkas JavaScript lain
module.exports = { NotePayloadSchema };

// pesan
// Kita gunakan destructuring object untuk mengantisipasi pembuatan lebih dari satu nilai Schema yang di ekspor pada berkas ini ke depannya.
// const Joi = require('joi');

// const NotePayloadSchema = Joi.object({
//     title: Joi.string().required(),
//     body: Joi.string().required(),
//     tags: Joi.array().items(Joi.string()).required(),
// });

// module.exports = { NotePayloadSchema };