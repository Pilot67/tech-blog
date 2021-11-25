const router = require("express").Router();
const { Posts, User, Comments  } = require("../../models");

//api/posts/{id}
router.get("/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id,{
        include: [
            {
                model: User,
                attributes: ["name"],
                required: false,
            },
            {
             model:Comments,
             attributes: ["id","date_created","comment_text"],
             include: [
                {
                     model: User, 
                     required: false,
                     attributes:["name"]
                }
                ]
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
    res.status(400).json("Hello World");
  }
});


module.exports = router;
