import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./data/mongoConnection.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import userRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

await connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Servidor levantado correctamente" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/clothes", clothesRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});