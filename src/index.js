app.get("/api/verify/mc/:mcNumber", async (req, res) => {
  const { mcNumber } = req.params;
  try {
    const carrierData = await fetchFMCSA(`/docket-number/${mcNumber}`);
    res.json(carrierData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch FMCSA data by MC" });
  }
});
