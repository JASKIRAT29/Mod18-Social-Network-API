const { Schema, model } = require('mongoose');

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    },],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
UserSchema.virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', UserSchema);

module.exports = User;
