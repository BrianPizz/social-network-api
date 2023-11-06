const router = require('express').Router();
const { User, Thought } = require('../../models');
const {
    getThoughts,
    getThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController')
// routes /api/thoughts
// Get all thoughts and create new thought
router
    .route('/')
    .get(getThoughts)
    .post(addThought);

// Get single thought, update thought, and delete thought
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// Create reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// Delete reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
