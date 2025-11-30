const express = require("express");
const router = express.Router();
const {
  getRecords,
  getFilters,
  getIntensityByYear,
  getLikelihoodByCountry,
  getTopicFrequency
} = require("../controllers/recordsController");

// basic endpoints
router.get("/", getRecords);
router.get("/filters", getFilters);

// aggregation endpoints
router.get("/agg/intensity-by-year", getIntensityByYear);
router.get("/agg/likelihood-by-country", getLikelihoodByCountry);
router.get("/agg/topic-frequency", getTopicFrequency);

module.exports = router;
