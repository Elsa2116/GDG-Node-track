import express from "express";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(morgan("dev")); // log all requests
app.use(express.json());
app.use("/books", bookRoutes);

export default app;
