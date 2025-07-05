
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const WEB_KEY = process.env.WEB_KEY;
const BASE_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers";

app.use(cors());

async function fetchFMCSA(path) {
  const res = await fetch(`${BASE_URL}${path}?webKey=${WEB_KEY}`);
  if (!res.ok) throw new Error(`Error fetching ${path}: ${res.status}`);
  return await res.json();
}

app.get("/api/verify/dot/:dotNumber", async (req, res) => {
  const { dotNumber } = req.params;
  try {
    const carrierData = await fetchFMCSA(`/${dotNumber}`);
    res.json(carrierData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch FMCSA data" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
