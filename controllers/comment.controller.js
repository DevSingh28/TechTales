import Comment from "../Models/comment.model.js";
import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";

export const add_comment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const { userid } = req.headers;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            user: userid,
            text
        });

        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        return res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const get_comments = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username avatar'
            }
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const sortedComments = post.comments.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({ comments: sortedComments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const update_comment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { text } = req.body;
        const { userid } = req.headers;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.user.toString() !== userid) {
            return res.status(403).json({ message: "You are not authorized to update this comment" });
        }

        comment.text = text;
        await comment.save();

        return res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const delete_comment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { userid } = req.headers;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.user.toString() !== userid) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await Comment.deleteOne({ _id: commentId });

        post.comments.pull(commentId);
        await post.save();

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};