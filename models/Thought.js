const { Schema, model } = require('mongoose');

// Schema to create Though model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => {
                if(date) return date.toLocaleDateString()
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought