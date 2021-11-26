const router = require("express").Router();
const { Posts, User, Comments } = require("../../models");
const authorize = require("../../utils/authorize");

//api/dash
router.get("/", authorize, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      where: { user_id: req.session.user_id },
    });
    const dashData = postsData.map((post) => post.get({ plain: true }));
    //console.log({ posts });
    res.render("mainDash", {
      dashData,
      logged_in: req.session.logged_in,
    });
    //res.status(200).json(dashData);
  } catch (err) {
    res.status(500).json("Dumb Error");
  }
});

// api/dash/{id}
router.delete("/:id", authorize, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found to delete" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", authorize, async (req, res) => {
  console.log(req.body);
  try {
    const updatePost = await Posts.update(
      {
        user_id: req.session.user_id,
        title: req.body.title,
        content: req.body.comment_text,
      },
      { where: { id: req.body.post_id } }
    );
    if (!updatePost) {
      res.status(404).json({ message: "No post found to delete" });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", authorize, async (req, res) => {
  console.log(req.body);
  try {
    const updatePost = await Posts.create(
      {
        user_id: req.session.user_id,
        title: req.body.title,
        content: req.body.comment_text,
      },
    );
    if (!updatePost) {
      res.status(404).json({ message: "No post created" });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
