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


module.exports = Thought;
