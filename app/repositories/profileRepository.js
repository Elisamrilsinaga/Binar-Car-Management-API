const { Profile } = require("../models");

module.exports = {
  create(createArgs) {
    return Profile.create(createArgs);
  },

  update(id, updateArgs) {
    return Profile.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Profile.destroy(id);
  },

  find(id) {
    return Profile.findByPk(id);
  },

  findAll() {
    return Profile.findAll();
  },

  getTotalProfile() {
    return Profile.count();
  },
};
