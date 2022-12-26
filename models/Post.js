import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        required: [true, "Provide a title"],
        type: String
    },
    body: {
        required: [true, "Provide a body"],
        type: String
    }
})


export default mongoose.model("Post", PostSchema)
