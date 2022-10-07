const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        
    },
    createdAt: {
        type: StringDate,
        default: Date.now
    },
    username: {

    },
    reactions: {
        
    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;