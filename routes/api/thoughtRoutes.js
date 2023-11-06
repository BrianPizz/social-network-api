const router = require('express').Router();
const { User, Thought } = require('../../models')

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();

        res.json(thoughts)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Get a specific thought
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }
        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Create a thought
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        )
        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Update a thought
router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }
        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Delete a thought
router.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Create thought reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Remove thought reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
