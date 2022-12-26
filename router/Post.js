import express from "express";


import {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost,
} from "../controllers/Post.js";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);
router.route("/:postId").get(getPost).patch(updatePost).delete(deletePost);

export default router
