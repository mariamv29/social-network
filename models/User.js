const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true, 
      trim: true
    },
    email: {
      type: String,
      required: true, 
      lowercase: true,
      // unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [ {
      type: Schema.Types.ObjectId,
      ref: "User",
    },],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);
// get total friend count 
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//create the User model using userSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
