const mongoose = require("mongoose");

const StyleSchema = mongoose.Schema({
  useremail: {
    type: String,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  season: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  share: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  clohteslist: {
    type: ARRAY,
  },
});

const Style = mongoose.model("Style", StyleSchema);

module.exports = { Style };
