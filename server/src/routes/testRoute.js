const express = require("express");
const router = express.Router();

const { Cerebras } = require(
  "@cerebras/cerebras_cloud_sdk"
);

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

router.get("/models", async (req, res) => {
  try {
    const models =
      await client.models.list();

    res.json(models);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
