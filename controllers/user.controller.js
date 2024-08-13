import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password, avatar, role, address, bio } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }
        const new_pass = await bcryptjs.hash(password, 10);

        const new_user = new User({
            email,
            password: new_pass,
            username,
            avatar,
            role,
            address,
            bio
        });

        await new_user.save();
        return res.status(200).json({ message: "User Signup Successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "No User Found! Try to Register First"
            });
        }

        const matched = await bcryptjs.compare(password, user.password);
        if (!matched) {
            return res.status(400).json({
                message: "Password Incorrect"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_TOKEN,
            { expiresIn: '7d' }
        );
        return res.status(200).json({
            message: 'Login Successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const GetData = async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json({ message: "User Data Exists", data });
    } catch (error) {
        console.error("Error during GetData:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const follow = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        console.log(`follower: ${currentUser._id}, Following: ${userToFollow._id}`)

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            userToFollow.followers.push(currentUser._id);

            await currentUser.save();
            await userToFollow.save();

            res.status(200).json({ message: "User followed" });
        } else {
            res.status(400).json({ message: "You already follow this user" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Unfollow a user
export const unfollow = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (currentUser.following.includes(userToUnfollow._id)) {
            currentUser.following.pull(userToUnfollow._id);
            userToUnfollow.followers.pull(currentUser._id);

            await currentUser.save();
            await userToUnfollow.save();

            res.status(200).json({ message: "User unfollowed" });
        } else {
            res.status(400).json({ message: "You do not follow this user" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const get_other_user_info = async (req, res) => {
    try {
        const { userid } = req.headers;
        const user = await User.findById(userid).populate('userPosts').select("-password");
        if (!user) {
            return res.status(400).json({message: "No user found"})
        }

        return res.status(200).json({message: "Success", data: user})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const update_profile = async (req, res) => {
    try {
        const { id } = req.headers;
        const { username, avatar, password, address, bio } = req.body;
        if (!username && !avatar && !password && !address && !bio) {
            return res.status(400).json({ message: "No update data provided." });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const updateData = {
            username: username,
            avatar: avatar,
            password: await bcryptjs.hash(password, 10),
            address: address,
            bio: bio
        };
        
        const updated_user = await User.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ message: "Profile Updated Successfully", user: updated_user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};