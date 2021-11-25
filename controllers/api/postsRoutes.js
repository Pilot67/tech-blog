const router = require("express").Router();
const { Posts, User, Comments } = require("../../models");
const authorize = require("../../utils/authorize")

//api/posts/{id}
router.get("/:id", authorize, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
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

    const posts = postData.get({ plain: true });
    res.render("addcomment", {
      posts,
      logged_in: req.session.logged_in,
    });

    //res.status(200).json(posts)
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/posts (post route)
router.post("/", async (req, res) => {
    console.log(req.session.user_id)
    console.log(req.body)
    try {
        const newComment = await Comments.create({
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            comment_text: req.body.comment_text,
        });
        
        res.status(200).json(newComment);
      } catch (err) {
        res.status(400).json(err);
      }
    });



module.exports = router;
