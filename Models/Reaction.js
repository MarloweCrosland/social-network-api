const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: String,
        
    },
    reactionBody: {
        type: String
    },
    username: {

    },
    createdAt: {
        
    }
})