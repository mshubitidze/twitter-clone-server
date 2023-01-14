import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createTweet, deleteTweet, likeOrDislike, getAllTweets, getUserTweets, getExploreTweets } from "../controllers/tweet.js";

const router = express.Router();

// Create a tweet
router.post("/", verifyToken, createTweet);

// Delete a tweet
router.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a tweet
router.post("/:id", likeOrDislike);

// Get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// Get user tweets
router.get("/user/all/:id", getUserTweets)

// Get explore tweets
router.get("/explore", getExploreTweets)

export default router;
