const { User} = require('../models');

const userController = {
  // Get all users
  getUsers(req,res) {
    User.find()
      .then(userData => res.json(userData))
      .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
  });
},
  // Get a create user
  createUser({body},res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // create a id of user
  getSingleUser({params}, res) {
    User.findOne({ _id: params.id })
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },
  // create a update user
  updateUser({params,body}, res) {
    User.findOneAndUpdate({ _id:params.id},body)
      .then(userData => {
        if(!userData) {
          res.status(404).json({ message: 'No user with that ID' })
          return;
  }
  res.json(userData);
})
 .catch(err => res.status(400).json(err));
  },
  // Delete a user and associated apps
  deleteUser({params}, res) {
    User.findOneAndDelete({ _id:params.id})
      .then(userData => {
        if(!userData) {
          res.status(404).json({ message: 'No user with that ID' })
          return;
  }
  res.json(userData);
})
 .catch(err => res.status(400).json(err));
  },
  // add friend
  addFriend({params}, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: {friends: params.friendId } },
        { new: true, runValidators: true}
        )
      .then(userData => {
        if(!userData) {
          res.status(404).json({ message: 'No user with that ID' })
          return;
  }
  res.json(userData);
})
 .catch(err => res.status(400).json(err));
  },
  // delete friend
  removeFriend({params}, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: {friends: params.friendId } },
        { new: true }
        )
      .then(userData => {
        if(!userData) {
          res.status(404).json({ message: 'No user with that ID' })
          return;
  }
  res.json(userData);
})
 .catch(err => res.status(400).json(err));
  },
};
module.exports = userController;