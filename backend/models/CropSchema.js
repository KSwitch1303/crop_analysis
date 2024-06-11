// create the crop schema
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  crop: String,
  diseases: [
    {
      disease: String,
      symptoms: [String],
      prevention: String,
      cure: String,
    },
  ],
});

Crop = mongoose.model("Crop", cropSchema)

module.exports = Crop