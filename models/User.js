const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/],
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
