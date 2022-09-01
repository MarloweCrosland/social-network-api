const { Schema, model, Types } = require('mongoose');


const ReactionsSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        trim: true
      },
      username: {
        required: true,
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdatVal => dateFormat(createdatVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: 
            [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual.apply('reactionCount').get(function() {
    return this.reactions.length;
});