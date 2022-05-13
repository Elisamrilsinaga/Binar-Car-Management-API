const profileRepository = require("../repositories/profileRepository");

module.exports = {
  create(requestBody) {
    return profileRepository.create(requestBody);
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
      // const postCount = await profileRepository.getTotalPost();

      return {
        data: posts,
      };
    } catch (err) {
      throw err;
    }
  },

  async findAlllist() {
    try {
      const posts = await profileRepository.findAll();
      // const postCount = await profileRepo.getTotalPost();

      return {
        data: posts,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return profileRepository.find(id);
  },
};
