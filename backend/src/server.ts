import express from "express";
import { RegisterRoutes } from "../build/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(express.urlencoded({extended: true}));
app.use(express.json());
RegisterRoutes(app);