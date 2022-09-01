const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
              ]
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total count of users friends arary
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => friends.length + 1, 0);
})

const User = model('User', UserSchema)

module.exports = User;