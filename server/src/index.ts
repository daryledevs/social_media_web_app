import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as dotenv from "dotenv";
import database from "./database";
import userRoutes from "./router/User";
import cookieParser from 'cookie-parser';
import authJWT from "./middleware/JWT";
import { ErrorHandler, checkToken } from "./helper/ErrorHandler";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API = process.env.API;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(authJWT());
app.use(ErrorHandler);
app.use(morgan("tiny"));

// Routes
app.use(`${API}/check-token`, checkToken);
app.use(`${API}/users`, userRoutes);

database.connect((error) => {
  if(error) throw error;
  console.log("Connected to MySQL Server!");
});

app.listen(PORT, () => {
  console.log("Connected", PORT);
});