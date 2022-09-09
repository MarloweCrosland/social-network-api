const { Thought, User } = require('../Models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

      // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    // create a new thought 
    // push the created thought's _id to the 
    // associated user's thoughts array field)
    addThought({ params, body}, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id} },
                { new: true }
            );
        })
    },

    //update thought bu id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete to remove thought by its id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    },

    //create reaction stored in a single thoughts reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },


    //delete reaction by the reactions reactionId value
    
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thougtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;

