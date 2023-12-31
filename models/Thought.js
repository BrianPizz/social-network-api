const { Schema, model, Types } = require('mongoose');
const Reaction = require('./Reaction')
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
            getters: true,
          },
          id: false,
    }
);
// virtual reaction count
thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length
    })
// create model
const Thought = model('thought', thoughtSchema);

module.exports = Thought