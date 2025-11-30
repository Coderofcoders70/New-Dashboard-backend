const Record = require("../models/Record");

// --------------------------------------
// 1. GET ALL RECORDS with filters
// --------------------------------------
exports.getRecords = async (req, res) => {
  try {
    const query = {};

    // build filters dynamically
    if (req.query.end_year) query.end_year = Number(req.query.end_year);
    if (req.query.topic) query.topic = req.query.topic;
    if (req.query.sector) query.sector = req.query.sector;
    if (req.query.region) query.region = req.query.region;
    if (req.query.country) query.country = req.query.country;
    if (req.query.pestle) query.pestle = req.query.pestle;
    if (req.query.source) query.source = req.query.source;

    const data = await Record.find(query).limit(5000);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------------------
// 2. GET UNIQUE FILTERS
// --------------------------------------
exports.getFilters = async (req, res) => {
  try {
    const filters = {
      end_year: await Record.distinct("end_year"),
      topic: await Record.distinct("topic"),
      sector: await Record.distinct("sector"),
      region: await Record.distinct("region"),
      country: await Record.distinct("country"),
      pestle: await Record.distinct("pestle"),
      source: await Record.distinct("source")
    };

    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------------------
// 3. INTENSITY BY YEAR (Line Chart)
// --------------------------------------
exports.getIntensityByYear = async (req, res) => {
  try {
    const agg = await Record.aggregate([
      { $match: { end_year: { $ne: null }}},
      { 
        $group: {
          _id: "$end_year",
          avgIntensity: { $avg: "$intensity" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(agg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------------------
// 4. LIKELIHOOD BY COUNTRY (Bar Chart)
// --------------------------------------
exports.getLikelihoodByCountry = async (req, res) => {
  try {
    const agg = await Record.aggregate([
      { $match: { country: { $ne: "Unknown" }}},
      { 
        $group: {
          _id: "$country",
          avgLikelihood: { $avg: "$likelihood" }
        }
      },
      { $sort: { avgLikelihood: -1 } },
      { $limit: 20 }
    ]);

    res.json(agg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------------------
// 5. TOPIC FREQUENCY (Pie / Doughnut Chart)
// --------------------------------------
exports.getTopicFrequency = async (req, res) => {
  try {
    const agg = await Record.aggregate([
      { $match: { topic: { $ne: "Unknown" }}},
      { 
        $group: {
          _id: "$topic",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 }},
      { $limit: 30 }
    ]);

    res.json(agg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
