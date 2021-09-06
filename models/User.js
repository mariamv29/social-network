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
    friends: [],
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

//get total count of friends and reply on retrival
UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce(
    (total, friend) => total + friend.reactions + 1,
    0
  );
});

//create the User model using userSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
