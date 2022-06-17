const USER = require("../model/userModel");
const POST = require("../model/postModel");

const userlogin = async (req, res) => {
  const { userName } = req.body;
  try {
    const userPresent = await USER.find({ userName: userName });
    if (userPresent.length > 0) {
      res.status(400).json({ message: "user allready present" });
    } else {
      const result = await USER.create(req.body);
      res.status(200).json({ message: "user created", respose: result });
    }
  } catch (error) {
    console.log("the user login error is ", error);
    res.status(400).json({ Message: "failed login" });
  }
};

const userProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await USER.findById(id);
    const details = {
      name: user.userName,
      followers: user.followers.length,
    };
    console.log({ user });
    res.status(200).json({ message: "success", userProfile: details });
  } catch (error) {
    console.log("failed to fetch error ", error);
    res.status(400).json({ message: "failed to fetch userprofile" });
  }
};

const allPostSorted = async (req, res) => {
  try {
    const post = await POST.find().populate("authorid").sort({ createdAt: -1 });
    console.log(post);
    if (post.length > 0) {
      const postData = {
        title: post[0].title,
        description: post[0].description,
        authorName: post[0].authorid.userName,
        comments: post[0].comments,
        likes: post[0].likes,
      };
      console.log({ postData });
      res.status(200).json({ message: "success", postDetails: postData });
    }
  } catch (error) {
    console.log("error is ", error);
    res.status(400).json({ message: "failed to get details" });
  }
};

const createNewPost = async (req, res) => {
  try {
    const result = await POST.create(req.body);
    const user = await USER.findByIdAndUpdate(req.body.authorid, {
      $addToSet: { myPostId: result._id },
    });
    res.status(200).json({ message: "new post created", respone: result });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed to create new post" });
  }
};

const singlePostDetails = async (req, res) => {
  try {
    const post = await POST.findById({ _id: req.params.id }).populate(
      "authorid"
    );
    res.status(200).json({ message: "success", postDetails: post });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed to get post details" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post1 = await POST.findById(req.params.id);
    const result = await POST.deleteOne({ _id: req.params.id });
    const user = await USER.findByIdAndUpdate(post1.authorid, {
      $pull: { myPostId: post1._id },
    });
    res
      .status(200)
      .json({ message: "post deleted sueccessfully", response: result });
  } catch (error) {
    console.log("failed to delete the post", error);
    res.status(400).json({ message: "failed to delete the post" });
  }
};

const updatePost = async (req, res) => {
  const data = req.body;
  try {
    const result = await POST.findByIdAndUpdate(req.params.id, data);
    res
      .status(200)
      .json({ message: "post updated succesfully", response: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to update post" });
  }
};

const followUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await USER.findById(req.params.id);
    console.log({ user });
    const FollowedUser = user.followers.some(function (id) {
      return id.equals(userId);
    });
    if (FollowedUser) {
      res.status(400).json({ message: "user allready follwed" });
    } else {
      const result = await USER.findByIdAndUpdate(req.params.id, {
        $addToSet: { followers: userId },
      });
      res.status(200).json({ message: "follow success", respose: result });
    }
  } catch (error) {
    console.log("failed to follow this user", error);
    res.status(400).json({ message: "failed to follow user" });
  }
};

const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const user = await USER.findById(id);
    const FollowedUser = user.followers.some(function (id) {
      return id.equals(userId);
    });
    console.log({ user, FollowedUser });
    if (FollowedUser) {
      const result = await USER.findByIdAndUpdate(id, {
        $pull: { followers: userId },
      });
      res.status(200).json({ message: "unfollow success", respose: result });
    } else {
      res.status(400).json({ message: "allready unfollwed" });
    }
  } catch (error) {
    console.log("the user unfollow error ", error);
    res.status(400).json({ message: "failed to unfollow user" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.id;
  console.log("postId", postId);
  try {
    const result = await POST.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
    res.status(200).json({ message: "post liked succefully", respone: result });
  } catch (error) {
    console.log("the likrpost error is ", error);
    res.status(400).json({ message: "failed to like the post" });
  }
};

const unlikePost = async (req, res) => {
  const postId = req.params.id;
  console.log("postId", postId);
  try {
    const result = await POST.findByIdAndUpdate(postId, {
      $inc: { likes: -1 },
    });
    res
      .status(200)
      .json({ message: "post unliked succefully", respone: result });
  } catch (error) {
    console.log("the unlikrpost error is ", error);
    res.status(400).json({ message: "failed to unlike the post" });
  }
};

const commentPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await POST.findByIdAndUpdate(postId, {
      $push: { comments: req.body.comment },
    });
    res.status(200).json({ message: "Post commented succesfully" });
  } catch (error) {
    console.log("the comment post error is",error);
    res.status(400).json({ message: "failed to comment the post" });
  }
};
module.exports = {
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
  commentPost,
};
