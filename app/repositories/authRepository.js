const { Profile } = require("../models");

module.exports = {
    create(createArgs){
        return Profile.create(createArgs);
    },

    getProfile({ username }){
        return Profile.findOne({ where: { username: username } });
    },
}