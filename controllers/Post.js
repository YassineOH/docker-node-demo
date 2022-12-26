import Post from "../models/Post.js";

const createPost = async (req, res) => {
    const { title, body } = req.body;

    try {
        const post = await Post.create({ body, title });
        return res.status(201).json(post);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error" })
    }

};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({
            numberOfPost: posts.length,
            posts
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error" })
    }

};

const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        return res.status(200).json(post);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error" })
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const { postId } = req.params;
        const newPost = await Post.findByIdAndUpdate(
            postId,
            { title, body },
            {
                new: true,
            }
        );
        return res.status(200).json(newPost);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error" })
    }

};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ msg: "post deleted" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error" })
    }

};

export { createPost, getPosts, getPost, updatePost, deletePost };
