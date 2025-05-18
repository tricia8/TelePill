const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/healthfinder", async (req, res) => {
  const { age, sex } = req.query;
  const url = `https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${age}&sex=${sex}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch healthfinder data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
