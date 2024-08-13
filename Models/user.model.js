import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    },
    savedPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    ],
    userPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
