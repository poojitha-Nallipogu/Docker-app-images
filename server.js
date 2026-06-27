import express from "express";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "grades.html"));
});

app.get("/api/students", async (req, res) => {
    try {
        const response = await axios.get(`http://${BACKEND_URL}:3000/students`);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({
            message: err.message
        });
    }
});

app.post("/api/students", async (req, res) => {
    try {
        const response = await axios.post(
            `http://${BACKEND_URL}:3000/students`,
            req.body
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({
            message: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
});