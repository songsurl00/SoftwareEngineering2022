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
  clotheslist: { type: [mongoose.Schema.Types.ObjectId], ref: "Clothes" },
});

//  [{ type : ObjectId, ref: 'User' }]
// friends: [{ type : ObjectId, ref: 'User' }],

const Style = mongoose.model("Style", StyleSchema);

module.exports = { Style };
