const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//reaction schema

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent thought _id
      reactionId: {
        type: Schema.Types.ObjectId,
        required: true, 
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

  
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      ref: 'User'
    },
    // user ReachtionSchema to validate for a reaction
   reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
})


const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
