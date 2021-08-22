const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

// buat class UsersService dan constructor yang menginisialisasi properti this._pool dengan nilai instance pg.Pool
class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    // Membuat Fungsi addUser dan verifyNewUsername -> addUser yang menerima parameter objek user (username, password, fullname)
    async addUser({ username, password, fullname }) {
        // TODO: Verifikasi username, pastikan belum terdaftar.
        await this.verifyNewUsername(username);

        // TODO: Bila verifikasi lolos, maka masukkan user baru ke database.
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.has(password, 10); //fungsi bcrypt.hash menerima dua parameter, yakni data dan saltRounds

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, username, hashedPassword, fullname],
        };

        const result = await this._pool.query(query);

        // kembalikan nilai addUser dengan result.rows[0].id. Mengapa? Karena kita akan membutuhkan id pada proses pengujian, lebih tepatnya untuk mengisi nilai variabel currentUserId
        if (!result.rows.length) {
            throw new InvariantError('User gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);
        // Jika result.rows.length menghasilkan nilai lebih dari 0, itu berarti username sudah ada di database. Pada saat ini terjadi, kita perlu membangkitkan error untuk memberitahu bahwa verifikasi username baru gagal.
        if (result.rows.length > 0) {
            // Mengapa kita gunakan InvariantError? Jawabannya tentu karena error ini termasuk kesalahan dalam bisnis logic yang tidak sesuai. InvariantError akan menghasilkan status code 400 dengan pesan ‘Gagal menambahkan user. Username sudah digunakan’. Pesan tersebut disesuaikan dengan pesan yang kita tetapkan pada skenario pengujian.
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
        }
    }

    async getUserById(userId) {
        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }
        // kembalikan fungsi getUserById dengan nilai user yang didapat pada result.rows[0].
        return result.rows[0];
    }
}

module.exports = UsersService;