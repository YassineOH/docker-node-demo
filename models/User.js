import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide a password"]
    }
})

export default mongoose.model("User", userSchema)