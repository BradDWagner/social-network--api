const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            //TODO: unique, trimmed
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
        }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;