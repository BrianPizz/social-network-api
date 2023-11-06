const router = require('express').Router();
const { User, Thought } = require('../../models')

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
})

module.exports = router;