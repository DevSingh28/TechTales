import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
