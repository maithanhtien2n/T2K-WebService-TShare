const { Account, UsersInfo } = require("./config");
const { throwError } = require("../../utils/index");
const { deleteFile, getFileName } = require("../../utils/handleUploads");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  registerMD: async ({
    full_name,
    user_name,
    password,
    birth_date,
    gender,
  }) => {
    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const accountInfo = await Account.findOne({ where: { user_name } });

      if (accountInfo) {
        throwError(210, "Tên người dùng đã tồn tại!");
      }

      const account = await Account.create({
        user_name,
        password: hashedPassword,
        role: "user",
      });

      await UsersInfo.create({
        account_id: account.account_id,
        full_name,
        birth_date,
        gender,
      });

      return "Đăng ký tài khoản thành công!";
    } catch (error) {
      throw error;
    }
  },

  loginMD: async ({ user_name, password }) => {
    try {
      const account = await Account.findOne({ where: { user_name } });

      const user_info = await UsersInfo.findOne({
        where: { account_id: account.account_id },
      });

      if (!account || !bcrypt.compareSync(password, account.password)) {
        throwError(205, "Tên tài khoản hoặc mật khẩu không chính xác!");
      }

      return {
        account_id: account.account_id,
        user_name: account.user_name,
        user_info,
        accessToken: jwt.sign(
          { account_id: account.account_id, user_name: account.user_name },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ),
      };
    } catch (error) {
      throw error;
    }
  },

  userInfoMD: async ({ account_id, user_name }) => {
    try {
      const userInfo = await UsersInfo.findOne({ where: { account_id } });

      if (userInfo) {
        return userInfo;
      } else {
        return `Không tìm thấy thông tin người dùng có account_id là ${account_id}`;
      }
    } catch (error) {
      throw error;
    }
  },

  accountInfoMD: async ({ account_info }) => {
    try {
      return account_info;
    } catch (error) {
      throw error;
    }
  },

  // ---------------------- API TRANG CÁ NHÂN ---------------------------------

  updateAvatarMD: async ({ user_id, avatar_user }) => {
    try {
      const usersInfo = await UsersInfo.findOne({ where: { user_id } });

      if (!usersInfo) {
        deleteFile([getFileName(avatar_user)]);
        throwError(204, "Không tìm thấy id người dùng!");
      }

      if (getFileName(avatar_user) === "null") {
        throwError(205, "Lỗi tải ảnh không thành công!");
      }

      if (usersInfo.avatar_user) {
        deleteFile([getFileName(usersInfo.avatar_user)]);
      }

      await UsersInfo.update({ avatar_user }, { where: { user_id } });

      return "Cập nhật ảnh đại diện thành công!";
    } catch (error) {
      throw error;
    }
  },
};
