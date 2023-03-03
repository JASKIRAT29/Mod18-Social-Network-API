const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
    .populated({
      path: "reactions",
      select: "-__v"
    })
    .select("-__v")
    .sort({_id:-1})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
},
  // Get a ID of thoughts
  getThoughtByID({params}, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
          res.status(400).json(err);
  });
        },
  // Add a thought
  addThought({params, body}, res) {
    Thought.create(body)
      .then(({_id}) => {
         return User.findOneAndUpdate(
            {_id:params.userId},
            {$push: {thoughts: _id}},
            { new: true }
         );
      })
      .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with that ID'})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},
  // Delete a thought
  deleteThought({params}, res) {
    Thought.findByIdAndDelete({ _id: req.params.courseId })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts with that ID' })
          return;
        }
      res.json(dbThoughtData);
    })
      .catch(err => res.json(err));
  },
  // Update a thought
  updateThought({params, body}, res) {
    Thought.findByIdAndUpdate({_id: params.thoughtId }, body, {new:true, runValidators:true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts with that ID' })
          return;
        }
      res.json(dbThoughtData);
    })
      .catch(err => res.json(err));
  },
// Add a reaction
addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reaction: body}},
            { new: true, runValidators: true }
         )
      .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with that ID'})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},
// Delete a reaction
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reaction: {reactionId: params.reactionId}}},
            { new: true, runValidators: true }
         )
      .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: 'No thoughts with that ID'})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
}
}
module.export = thoughtController;