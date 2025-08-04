import express from "express";
import authRouter from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import tvRoutes from "./routes/tv.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRouter from "./routes/Search.js";

const app = express();
const PORT = ENV_VARS.PORT;

const cors = require("cors");

app.use(
  cors({
    origin: "https://netfliz-clone-ui.netlify.app", // your Netlify frontend domain
    credentials: true, // Allow cookies / headers to be shared
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRouter);

app.listen(PORT, () => {
  console.log(`Server satrted at http://localhost:${PORT}`);
  connectDB();
});
