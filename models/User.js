const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    createdBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      thoughts: []
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

//create the User model using userSchema 
const User = model('User', UserSchema);

// export the User model 
module.exports = User;