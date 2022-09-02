const router = require('express').Router();

const {
getAllThoughts,
getThoughtById,
addThought,
updateThought,
removeThought,
createReaction,
removeReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router
.get(getAllThoughts)
.post(addThought);

//thoughts/thought:id
router
.route('/:thoughs/thoughtId')
.get(getThoughtById)
.post(addComment)
.put(updateThought)
.delete(removeThought)


router
.route('/thoughts/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction);

module.exports = router;
