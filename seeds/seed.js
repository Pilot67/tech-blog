const sequelize = require("../config/connection");
const { User, Posts, Comments } = require("../models");

const userData = require("./userData.json");
const postsData = require("./postsData.json");
const commentsData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Posts.bulkCreate(postsData, {
    individualHooks: true,
    returning: true,
  });

  const commnets = await Comments.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
