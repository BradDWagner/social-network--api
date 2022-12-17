const { Schema, model } = requrie('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,

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
            getters: true,
            virtuals: true,
        },
    }
)

userSchema.get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;