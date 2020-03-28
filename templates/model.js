const mongoose = require("mongoose");

const { Schema } = mongoose;

const {name}Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("{name}", {name}Schema);

