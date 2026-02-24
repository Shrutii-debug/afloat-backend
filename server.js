import dotenv from "dotenv";
import app from "./src/app.js";
import { pool } from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {
    console.log("DB Connected");
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})
})
.catch((err) => {
    console.error("DB Connection Failed:", err);
  });
