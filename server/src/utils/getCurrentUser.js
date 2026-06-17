const User = require("../models/User");

const getCurrentUser = async (id, fields = "") => {
  return await User.findById(id).select(fields);
};

module.exports = getCurrentUser;
