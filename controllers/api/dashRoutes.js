const router = require("express").Router();
const { Posts, User, Comments } = require("../../models");
const authorize = require("../../utils/authorize")

//api/dash
router.get("/", authorize, async (req,res) => {
    try {
        const postsData = await Posts.findAll({
            where: {user_id: req.session.user_id}
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
    

})


module.exports = router;