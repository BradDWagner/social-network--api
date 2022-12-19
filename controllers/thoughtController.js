const { User, Thought, } = require('../models');

const getThoughts = async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.status(200).json(thoughtData);
     }
     catch (err) {
        res.status(500).json(err);
     }
};

const getSingleThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findById(req.params.thoughtId);
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const createThought = async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const updateThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const deleteThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete( {_id: req.params.thoughtId} );
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const createReaction = async (req, res) => {
    try {
        const reactionData = Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );
        res.status(200).json(reactionData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const deleteReaction = async (req, res) => {
    try {
        const reactionData = Thougth.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        res.status(200).json(reactionData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { 
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction }