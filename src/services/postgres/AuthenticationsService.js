const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

// AuthenticationService ini akan bertanggung jawab dalam menangani pengelolaan data refresh token pada tabel authentications melalui fungsi-fungsi:

// Memasukkan refresh token (addRefreshToken).
// Memverifikasi atau memastikan refresh token ada di database (verifyRefreshToken).
// Menghapus refresh token (deleteRefreshToken).

class AuthenticationsService {
    constructor() {
        this._pool = new Pool();
    }

    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token],
        }

        await this._pool.query(query);
    }

    async verifyRefreshToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak valid');
        }
    }
}