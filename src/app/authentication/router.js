module.exports = (router) => {
  const commonRoute = "/api/v1";
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");
  const { upload } = require("../../utils/handleUploads");

  // API đăng ký tài khoản
  router.post(`${commonRoute}/account/register`, controller.registerCT);

  // API đăng nhập tài khoản
  router.post(`${commonRoute}/account/login`, controller.loginCT);

  // API lấy thông tin người dùng
  router.get(
    `${commonRoute}/user-info/:id`,
    authenticateToken,
    controller.userInfoCT
  );

  // API lấy thông tin tài khoản người dùng
  router.get(
    "/api/v1/account-info",
    authenticateToken,
    controller.accountInfoCT
  );

  // -----------------------------------API TRANG CÁ NHÂN -------------------------------
  // API đăng nhập tài khoản
  router.post(
    `${commonRoute}/user-info/avatar`,
    upload.fields([{ name: "avatar_user" }]),
    controller.updateAvatarCT
  );
};
