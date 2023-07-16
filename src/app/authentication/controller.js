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

  accountInfoCT: async (req, res) => {
    await onResponse(req, res, model.accountInfoMD, {
      data: { account_info: req.account_info },
    });
  },

  // ------------------------------ API TRANG CÁ NHÂN ---------------------------------

  updateAvatarCT: async (req, res) => {
    const { user_id } = req.body;
    // Đường dẫn tệp ảnh banner
    const avatar_user = `http://${req.headers.host}/uploads/${
      req.files["avatar_user"] === undefined
        ? "null"
        : req.files["avatar_user"][0].filename
    }`;

    await onResponse(req, res, model.updateAvatarMD, {
      checkData: ["user_id"],
      data: { user_id, avatar_user },
    });
  },
};
