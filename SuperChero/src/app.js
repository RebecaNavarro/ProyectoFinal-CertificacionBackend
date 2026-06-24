import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Servidor levantado correctamente" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/clothes", clothesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

app.use(errorHandler);

export default app;