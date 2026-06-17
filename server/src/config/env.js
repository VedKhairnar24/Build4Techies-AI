module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI,
  CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,
  CEREBRAS_MODEL: process.env.CEREBRAS_MODEL,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN
};
