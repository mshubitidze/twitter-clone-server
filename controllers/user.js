import { handleError } from "../error.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You can only delete your own account"));
  }
};

export const follow = async (req, res, next) => {
  try {
    // User
    const user = await User.findById(req.params.id);
    // Current User
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("You are already following this user");
    }
    res.status(200).json("Following the user");
  } catch (err) {
    next(err);
  }
};

export const unFollow = async (req, res, next) => {
  try {
    // User
    const user = await User.findById(req.params.id);
    // Current User
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });

      await user.updateOne({
        $pull: { followers: req.body.id },
      });
    } else {
      res.status(403).json("You are already not following this user");
    }
    res.status(200).json("Unfollowing the user");
  } catch (err) {
    next(err);
  }
};
