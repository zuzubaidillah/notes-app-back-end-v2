const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBToModel } = require('../../utils');

class NotesService {
    constructor() {
        this._pool = new Pool();
    }

    async addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt],
        }

        // Ingat! fungsi query() berjalan secara asynchronous, dengan begitu kita perlu menambahkan async pada addNote dan await pada pemanggilan query()
        const result = await this._pool.query(query);

        // Untuk memastikan notes berhasil dimasukan ke database, kita bisa evaluasi nilai dari results.rows[0].id (karena kita melakukan returning id pada query).
        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes');

        // Sebelum mengembalikan notes, kita perlu menyesuaikan kembali strukturnya dengan cara mapping objek
        return result.rows.map(mapDBToModel);
    }

    // lakukan query untuk mendapatkan note di dalam database berdasarkan id yang diberikan
    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        // Kemudian periksa nilai result.rows, bila nilainya 0 (false) maka bangkitkan NotFoundError. Bila tidak, maka kembalikan dengan result.rows[0] yang sudah di-mapping dengan fungsi mapDBToModel
        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows.map(mapDBToModel)[0];
    }

    // lakukan query untuk mengubah note di dalam database berdasarkan id yang diberikan
    async editNoteById(id, { title, body, tags }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
            values: [title, body, tags, updatedAt, id],
        };

        const result = await this._pool.query(query);

        // periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
    }

    // lakukan query untuk menghapus note di dalam database berdasarkan id yang diberikan
    async deleteNoteById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        // periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError
        if (!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = NotesService;