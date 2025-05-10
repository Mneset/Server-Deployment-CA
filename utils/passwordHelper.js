const crypto = require('crypto');

function hashPassword(plainPassword) {
    return new Promise ((resolve, reject) => {
        const salt = crypto.randomBytes(16)

        crypto.pbkdf2(plainPassword, salt, 310000, 32, 'sha256', (err, hashPassword) => {
            if(err) return reject(err)

            resolve({
                salt,
                encryptedPassword: hashPassword
            });
        });
    });
};

function comparePassword(plainPassword, encryptedPasswordBuffer, saltBuffer) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(plainPassword, saltBuffer, 310000, 32, 'sha256', (err, hashedPassword) => {
            if(err) return reject(err)

            resolve(crypto.timingSafeEqual(hashedPassword, encryptedPasswordBuffer));
        });
    });
};

module.exports = { hashPassword, comparePassword };
