import dotEnv from "dotenv";
dotEnv.config();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  GOOGLE_GEMINI_AI: process.env.GOOGLE_GEMINI_AI,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
const config = Object.freeze(_config);
export default config;
