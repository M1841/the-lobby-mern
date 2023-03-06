import User from "../models/User.js";

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Read -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFollowees = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const followees = await Promise.all(
            user.followees.map((id) => User.findById(id))
        );
        const formattedFollowees = followees.map(({
            _id,
            firstName,
            lastName,
            location,
            picturePath
        }) => {
            return {
                _id,
                firstName,
                lastName,
                location,
                picturePath
            }
        });
        res.status(200).json(formattedFollowees);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFollowers = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        const formattedFollowers = followers.map(({
            _id,
            firstName,
            lastName,
            location,
            picturePath
        }) => {
            return {
                _id,
                firstName,
                lastName,
                location,
                picturePath
            }
        });
        res.status(200).json(formattedFollowers);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Update -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export const followUnfollow = async(req, res) => {
    try {
        const { id, followeeId } = req.params;
        const user = await User.findById(id);
        const followee = await User.findById(followeeId);

        if(user.followees.includes(followeeId)) {
            user.followees = user.followees.filter((id) => id !== followeeId);
            followee.followers = followee.followers.filter((id) => id !== id);
        }
        else {
            user.followees.push(followeeId);
            followee.followers.push(id);
        }
        await user.save();
        await followee.save();

        const followees = await Promise.all(user.followees.map((id) => User.findById(id)));
        const formattedFollowees = followees.map(({
            _id,
            firstName,
            lastName,
            location,
            picturePath
        }) => {
            return {
                _id,
                firstName,
                lastName,
                location,
                picturePath
            }
        });
        res.status(200).json(formattedFollowees);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
};