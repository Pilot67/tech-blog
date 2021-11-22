const router = require("express").Router();
const { Posts, User, Comments } = require("../models");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    const posts = postsData.map((posts) => posts.get({ plain: true }));
    res.status(200).json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});
