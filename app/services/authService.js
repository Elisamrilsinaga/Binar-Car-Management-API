const authRepository = require("../repositories/authRepository");

module.exports = {
    create(requestBody) {
        return authRepository.create(requestBody);
    },

    getUser(requestBody) {
        return authRepository.getUser(requestBody);
    },
};