const model = require("./model");
const { onResponse } = require("../../utils/index");

module.exports = {
  registerCT: async (req, res) => {
    await onResponse(req, res, model.registerMD, {
      checkData: ["full_name", "user_name", "password", "birth_date", "gender"],
      data: ({ full_name, user_name, password, birth_date, gender } = req.body),
    });
  },

  loginCT: async (req, res) => {
    await onResponse(req, res, model.loginMD, {
      checkData: ["user_name", "password"],
      data: ({ user_name, password } = req.body),
    });
  },

  userInfoCT: async (req, res) => {
    await onResponse(req, res, model.userInfoMD, {
      data: { account_id: req.params.id, user_name: req.user_name },
    });
  },
};
