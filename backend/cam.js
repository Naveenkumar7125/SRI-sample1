// backend/routes/ipProxy.js (very simple)
const express = require("express");
const fetch = require("node-fetch"); // npm i node-fetch@2
const router = express.Router();

router.get("/ip-cam", async (req, res) => {
  const url = req.query.url; // e.g., ?url=http://192.168.219.228:8080
  if (!url) return res.status(400).send("Missing url");
  try {
    const resp = await fetch(url);
    const buffer = await resp.arrayBuffer();
    res.set("Content-Type", resp.headers.get("content-type") || "image/jpeg");
    res.set("Access-Control-Allow-Origin", "*");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Proxy fetch failed: " + String(err));
  }
});

module.exports = router;
