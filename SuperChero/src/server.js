import dotenv from "dotenv";
import { connectDB } from "./data/mongoConnection.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});