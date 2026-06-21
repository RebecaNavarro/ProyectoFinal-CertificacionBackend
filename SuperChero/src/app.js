import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./data/mongoConnection.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

await connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Servidor levantado correctamente" });
});

app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});