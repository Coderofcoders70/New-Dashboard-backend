const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  end_year: { type: Number, default: null },

  intensity: { type: Number, default: null },
  likelihood: { type: Number, default: null },
  relevance: { type: Number, default: null },

  sector: { type: String, default: "Unknown" },
  topic: { type: String, default: "Unknown" },

  insight: { type: String },
  url: { type: String },

  region: { type: String, default: "Unknown" },
  country: { type: String, default: "Unknown" },

  start_year: { type: Number, default: null },
  impact: { type: Number, default: null },

  pestle: { type: String, default: "Unknown" },
  source: { type: String, default: "Unknown" },

  title: { type: String }
});

module.exports = mongoose.model("Record", RecordSchema);
