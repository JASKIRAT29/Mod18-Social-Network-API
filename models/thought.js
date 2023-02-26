const { Schema,models, Types } = require('mongoose');
const dataFormat = require("../utils/dataFormat")

const responseSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dataFormat(createdAtVal),
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
        required: true,
        maxlength: 50,
        minlength: 4,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  // Create a virtual property `responses` that gets the amount of response per thought
ThoughtSchema
.virtual("reactionCount")
// Getter
.get(function () {
  return this.reactions.length;
});

// Initialize our thought model
const Thought = model("Thought", ThoughtSchema);


module.exports = Thought;
