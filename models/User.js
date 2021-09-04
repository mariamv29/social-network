const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
{
    username: {
        type: String
    },
    email: {
        type: String
    },
      createdAt: {
        type: Date,
        default: Date.now
      },
      thoughts: [ 
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
      ],
      friends: []
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
)

//get total count of thoughts and reply on retrival 
UserSchema.virtual("thoughtCount").get(function(){
  return this.thought.length;
})

//create the User model using userSchema 
const User = model('User', UserSchema);

// export the User model 
module.exports = User;