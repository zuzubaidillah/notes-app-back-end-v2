// //Objek TokenManager akan memiliki fungsi-fungsi yang sudah kita sebutkan di awal. Jadi, yuk kita mulai buat fungsi pertama yakni generateAccessToken.
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
    // //Buat properti fungsi generateAccessToken yang menerima satu parameter yakni payload.
    // generateAccessToken(payload) {
    // //kembalikan fungsi ini dengan JWT token yang dibuat menggunakan fungsi JWT.token.generate() dari package @hapi/jwt.
    // //Fungsi generate menerima dua parameter, yang pertama adalah payload dan kedua adalah secretKey
    // return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
    // //Pada parameter payload, kita akan memberikan nilai payload yang ada di parameter fungsi. Kemudian secretKey, sesuai namanya ia adalah kunci yang digunakan algoritma enkripsi sebagai kombinasi untuk membuat JWT token. Kunci ini bersifat rahasia, jadi jangan disimpan di source code secara transparan. Kita akan simpan key di dalam environment variable ACCESS_TOKEN_KEY
    // }
    // //Karena kode pada fungsi generateAccessToken hanya satu baris, kita bisa manfaatkan arrow function agar kodenya lebih singkat.
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    // Buat fungsi ketiga dengan nama verifyRefreshToken yang menerima satu parameter string bernama refreshToken
    verifyRefreshToken: (refreshToken) => {
        try {
            // Untuk men-decoded token, gunakan fungsi Jwt.token.decoded dan fungsi tersebut akan mengembalikan artifacts.
            const artifacts = Jwt.token.decode(refreshToken);

            // Setelah artifacts didapatkan, barulah kita bisa melakukan verifikasi. Silakan panggil fungsi Jwt.token.verifySignature dengan memberikan artifacts dan process.env.REFRESH_TOKEN_KEY sebagai nilai parameternya
            Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
            // Fungsi verifySignature ini akan mengecek apakah refresh token memiliki signature yang sesuai atau tidak. Jika hasil verifikasi sesuai, fungsi ini akan lolos. Namun bila tidak, maka fungsi ini akan membangkitkan eror. makanya kita menggunakan trycatch

            // Di dalam blok try, lanjutkan untuk mengembalikan fungsi dengan nilai payload yang di dapat dari artifacts.decoded
            const { payload } = artifacts.decoded;
            return payload; //Nilai payload tersebut nantinya akan digunakan dalam membuat akses token baru.

        } catch (error) {
            throw new InvariantError('Refresh token tidak valid');
        }
    }

};

module.exports = TokenManager;