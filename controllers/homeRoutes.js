const router = require("express").Router();
const { Posts, User, Comments } = require("../models");
const authorize = require("../utils/authorize");

router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [        {
        model: User,
        attributes: ["name"],
        required: false,
      },
      {
        model: Comments,
        attributes: ["id", "date_created", "comment_text"],
        include: [
          {
            model: User,
            required: false,
            attributes: ["name"],
          },
        ],
      },
],
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render("mainMenu", {
      posts,
      logged_in: req.session.logged_in,
    });
    //res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//Render the edit Post screen
router.get("/edit/:id", authorize, async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id);
    const posts = postsData.get({ plain: true });
    res.render("editPostDash", {
      posts,
      logged_in: req.session.logged_in,
    });
    //res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/newpost", authorize, async (req, res) => {
  try {
    const posts = {title: "", content: "", new: true}
    res.render("editPostDash", {
      posts,
      logged_in: req.session.logged_in,
    });
    //res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
