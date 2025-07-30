import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Konfigurasi dasar
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3004;
const API_KEY = "779AAC71A84011D708045B5EBC05DFE9"; // Ganti dengan API-mu
const STEAM_ID = "76561198868613232"; // Ganti dengan Steam ID kamu

app.use(cors());
app.use(express.static(__dirname)); // Agar bisa akses index.html dan file statis lainnya

// Endpoint data profil Steam
app.get("/steam-profile", async (req, res) => {
  try {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${STEAM_ID}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Steam API Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Steam profile:", error.message);
    res.status(500).json({ error: "Gagal mengambil data dari Steam API", details: error.message });
  }
});

// Endpoint game terakhir dimainkan
app.get("/steam-games", async (req, res) => {
  try {
    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.response || !data.response.games) {
      throw new Error("Tidak ada game yang ditemukan.");
    }

    res.json(data.response.games);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).json({ error: "Gagal mengambil data game dari Steam API", details: error.message });
  }
});

// Sajikan index.html saat akses root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

