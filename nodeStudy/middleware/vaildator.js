module.exports = {
  postValid: (req, res, next) => {
    const { content } = req.body;
    if (!content) res.status(400).json({ success: false, message: "content가 없음" });
    else next();
  },
  putValid: (req, res, next) => {
    const { content } = req.body;
    if (!content) res.status(400).json({ success: false, message: "content가 없음" });
    else next();
  },
};
