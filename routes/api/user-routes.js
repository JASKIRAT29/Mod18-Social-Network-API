const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Set up get all and post at /api/users
router.route('/').get(getUsers).post(createUser);

// Set up get, put, and delete at /api/users/:userId
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// Add and delete a friends
router.route('/:id/friends/friendsId').post(addFriend).delete(removeFriend);


module.exports = router;
