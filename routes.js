const router = require("express").Router();
const {
  userlogin,
  userProfile,
  allPostSorted,
  createNewPost,
  singlePostDetails,
  deletePost,
  updatePost,
  followUser,
  unfollowUser,
  likePost,
  unlikePost,
  commentPost
} = require("./controlers/userControlles");

router.post("/user", userlogin);
router.get("/user/:id", userProfile);
router.get("/posts", allPostSorted);
router.post("/posts", createNewPost);
router.get("/posts/:id", singlePostDetails);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);
router.post("/like/:id",likePost)
router.post("/unlike/:id",unlikePost)
router.post("/comment/:id",commentPost)

module.exports = router;
