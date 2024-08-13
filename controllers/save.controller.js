import User from "../Models/user.model.js";

export const save_to_fav = async (req, res) => {
    try {
        const { postid, id } = req.headers;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isavailable = user.savedposts.includes(postid);
        if (isavailable) {
            return res.status(200).json({ message: "Already Saved" });
        }

        user.savedposts.push(postid);
        await user.save();
        return res.status(200).json({ message: "Post Saved" });
    } catch (error) {
        console.error("Error saving post to favorites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const delete_from_save = async (req, res) => {
    try {
        const { postid, id } = req.headers;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isavailable = user.savedposts.includes(postid);
        if (!isavailable) {
            return res.status(400).json({ message: "First save it then remove it" });
        }

        user.savedposts.pull(postid);
        await user.save();
        return res.status(200).json({ message: "Post Unsaved" });
    } catch (error) {
        console.error("Error removing post from favorites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const all_saved = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate('savedposts').sort({ createdAt: -1 });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const saved_posts = user.savedposts;
        if (saved_posts.length > 0) {
            return res.status(200).json({ message: 'Success', data: saved_posts });
        } else {
            return res.status(200).json({ message: "No Saved Post", data: [] });
        }
    } catch (error) {
        console.error("Error fetching saved posts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
