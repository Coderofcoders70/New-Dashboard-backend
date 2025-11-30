const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Record = require("../models/Record");
require("dotenv").config();
const connectDB = require("../config/db");

const cleanValue = (value, type = "string") => {
  if (value === "") {
    return type === "number" ? null : "Unknown";
  }
  return value;
};

const importData = async () => {
  try {
    await connectDB();

    const filePath = path.join(__dirname, "../../data/jsondata.json");
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    const cleaned = jsonData.map((item) => ({
      end_year: cleanValue(item.end_year, "number"),
      intensity: cleanValue(item.intensity, "number"),
      likelihood: cleanValue(item.likelihood, "number"),
      relevance: cleanValue(item.relevance, "number"),

      sector: cleanValue(item.sector),
      topic: cleanValue(item.topic),

      insight: item.insight,
      url: item.url,

      region: cleanValue(item.region),
      country: cleanValue(item.country),

      start_year: cleanValue(item.start_year, "number"),
      impact: cleanValue(item.impact, "number"),

      pestle: cleanValue(item.pestle),
      source: cleanValue(item.source),

      title: item.title,
    }));

    await Record.deleteMany(); 
    await Record.insertMany(cleaned);

    console.log("JSON Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
