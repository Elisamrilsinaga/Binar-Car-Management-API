const profileRepository = require("../repositories/profileRepository");

module.exports = {
  create(requestBody) {
    return profileRepository.create(requestBody);
  },

  login(requestBody){
    return profileRepository.login(requestBody);
  },

  update(id, requestBody) {
    return profileRepository.update(id, requestBody);
  },

  delete(id) {
    return profileRepository.delete(id);
  },

  async list() {
    try {
      const posts = await profileRepository.findAll();
      const postCount = await profileRepository.getTotalProfile();

      return {
        data: posts,
        count: postCount
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return profileRepository.find(id);
  },
};
