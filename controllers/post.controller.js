import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";

export const create_post = async (req, res) => {
    try {
        const { title, url, desc } = req.body;
        const userId = req.headers.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to create posts" });
        }

        const newPost = new Post({
            title,
            url,
            desc,
            author: user._id
        });
        const savedPost = await newPost.save();

        await User.findByIdAndUpdate(
            user._id,
            { $push: { userPosts: savedPost._id } },
            { new: true, useFindAndModify: false }
        );

        return res.status(201).json({ message: "Post Created Successfully", data: savedPost });
    } catch (error) {
        console.error("Error during post creation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const all_post = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('author', 'username avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        res.status(200).json({
            data: posts,
            totalPosts,
            page,
            limit,
            totalPages: Math.ceil(totalPosts / limit),
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const lim_post = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username avatar').sort({ createdAt: -1 }).limit(4)
        if (posts) {
            return res.status(200).json({message: "Data Fetch Successfully", data: posts})
        }
        else {
            return res.status(400).json({message: "Some Error Occured"})
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const post_by_id = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'username avatar');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({ message: "Success", data: post });
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const update_post = async (req, res) => {
    try {
        const { postid, userid } = req.headers;
        const user = await User.findById(userid);
        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update posts" });
        }
        await Post.findByIdAndUpdate(postid, {
            title: req.body.title,
            url: req.body.url,
            desc: req.body.desc
        });
        return res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error during post update:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const Deletepost = async (req, res) => {
    try {
        const { id, postid } = req.headers;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to delete posts" });
        }

        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await Post.findByIdAndDelete(postid);
        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error during post deletion:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const like_a_post = async ( req, res ) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.likes.includes(req.user.id)) { // Assuming req.user is populated
            post.likes.push(req.user.id);
            await post.save();
            res.status(200).json({ message: "Post liked" });
        } else {
            res.status(400).json({ message: "You already liked this post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Unlike a post
export const unlike_a_post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likes.includes(req.user.id)) { // Assuming req.user is populated
            post.likes.pull(req.user.id);
            await post.save();
            res.status(200).json({ message: "Post unliked" });
        } else {
            res.status(400).json({ message: "You have not liked this post" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

