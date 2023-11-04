const router = require('express').Router();
const { User, Thought } = require('../../models')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

// Get a single user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

// Update a user
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId })

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }

        // delete associated thoughts

        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Add a friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }

        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

// Remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }

        res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})


module.exports = router;
