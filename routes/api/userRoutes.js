const router = require('express').Router();
const { User, Thought } = require('../../models')
const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

// Get all users route and post new user
router
    .route('/')
    .get(getUsers)
    .post(addUser);

// Get a single user, update a single user, and delete a user
router
    .route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// Add and remove friend
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
