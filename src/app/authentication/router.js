module.exports = (router) => {
  const commonRoute = "/api/v1";
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");

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

  // API xác thực token
  router.post("/api/v1/token-authentication", authenticateToken, (req, res) => {
    res.json({
      success: true,
      statusCode: 200,
      statusValue: "Xác thực token thành công!",
      data: req.username,
    });
  });
};
