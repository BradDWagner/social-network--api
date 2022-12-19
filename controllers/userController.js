const { User, Thought } = require('../models');

const getUsers = async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.userId);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const UserData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userData = await User.findOneDelete({ _id: req.params.userId});
        if (userData) {
            const thoughtData = Thought.deleteMany({ _id: { $in: userData.thoughts} })
            console.log(thoughtData);
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const createFriend = async (req, res) => {
    try {
        const friendData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId}},
            { runValidators: true, new: true },
        )
        res.status(200).json(friendData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const deleteFriend = async (req, res) => {
    try {
        const friendData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId}},
            { runValidators: true, new: true },
        )
        res.status(200).json(friendData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
}