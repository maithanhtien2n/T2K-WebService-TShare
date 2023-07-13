const { ListPosts, Likes, UsersInfo, Comments } = require("./config");
const { throwError } = require("../../utils/index");
const { deleteFile, getFileName } = require("../../utils/handleUploads");
require("dotenv").config();

module.exports = {
  createPostsMD: async ({ user_id, posts_content, posts_file, type_file }) => {
    try {
      const usersInfo = await UsersInfo.findOne({ where: { user_id } });

      if (!usersInfo) {
        deleteFile([getFileName(posts_file)]);
        throwError(204, "Không tìm thấy id người đăng bài!");
      }

      if (getFileName(posts_file) === "null") {
        await ListPosts.create({ user_id, posts_content });
      } else {
        await ListPosts.create({
          user_id,
          posts_content,
          posts_file,
          type_file,
        });
      }

      return "Tạo mới bài viết thành công!";
    } catch (error) {
      throw error;
    }
  },

  likePostsMD: async ({ posts_id, user_id }) => {
    try {
      // Kiểm tra xem người dùng đã like bài viết hay chưa
      const existingLike = await Likes.findOne({
        where: { posts_id, user_id },
      });

      if (existingLike) {
        // Nếu đã tồn tại like, thực hiện xóa like
        await Likes.destroy({ where: { posts_id, user_id } });

        return "Đã xóa like thành công";
      } else {
        // Nếu chưa tồn tại like, thực hiện thêm like
        await Likes.create({ posts_id, user_id });

        return "Đã thêm like thành công";
      }
    } catch (error) {
      throw error;
    }
  },

  commentPostsMD: async ({ posts_id, user_id, comment_content }) => {
    try {
      await Comments.create({ posts_id, user_id, comment_content });

      return "Đã thêm comment thành công";
    } catch (error) {
      throw error;
    }
  },

  getListPostsMD: async ({ user_id }) => {
    try {
      const listPosts = await ListPosts.findAll({
        where: { user_id },
        include: [
          {
            model: UsersInfo,
            as: "poster_info",
            attributes: ["full_name", "avatar_user"],
          },
          {
            model: Likes,
            as: "list_like",
            include: {
              model: UsersInfo,
              as: "user_info",
              attributes: ["full_name", "gender"],
            },
            attributes: ["user_id"],
          },
          {
            model: Comments,
            as: "list_comment",
            include: {
              model: UsersInfo,
              as: "user_info",
              attributes: ["full_name", "avatar_user"],
            },
            attributes: ["comment_id", "comment_content"],
          },
        ],
      });

      return listPosts.reverse();
    } catch (error) {
      throw error;
    }
  },
};
