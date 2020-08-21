const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const user = require("../models/user");

const UserController = {
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { id: req.user.id }, //디시리얼라이즈가 req.user에 user를 넣어주어 사용가능
        include: [{ model: Post, attributes: ["id"] }], //Post 테이블의 id 속성이 현재 user의 id 값과 같은 튜플을 포함한다.
      });
      if (!user) res.status(404).json({ success: false, message: "유저가 없다" });
      else res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(err);
      next(err);
    }
  },

  modifyUserPassword: async (req, res, next) => {
    const { password, newPassword } = req.body;
    try {
      if (await bcrypt.compare(password, req.user.password)) {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(newPassword, salt);
        await User.update({ password: newHashPassword }, { where: { id: req.user.id } });
        req.logOut();
        res.status(200).json({ success: true, message: "비밀번호가 성공적으로 수정됨" });
      } else {
        res.status(403).json({ success: false, message: "비밀번호가 틀립니다." });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  modifyUserName: async (req, res, next) => {
    try {
      const { newName } = req.body;
      const user = await User.findOne({
        attributes: { exclude: "password" },
        where: { id: req.user.id },
      });
      if (user) {
        await User.update({ name: newName }, { where: { id: req.user.id } });
        res.status(200).json({ success: true, message: "회원 이름이 성공적으로 수정되었습니다." });
      } else res.status(404).json({ success: false, message: "회원이 존재하지 않습니다." });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    const { password } = req.body;
    if (await bcrypt.compare(password, req.user.password)) {
      //회원 탈퇴 전 비밀번호를 한번 더 입력
      await User.destroy({ where: { id: req.user.id } });
      req.logOut();
      res.status(200).json({ success: true, message: "회원 탈퇴가 되었습니다." });
    } else res.status(403).json({ success: false, message: "비밀번호가 틀립니다." });
  },
};

module.exports = UserController;
