import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Extraire le cityInput du corps de la requête
    const { cityInput } = req.body;

    // Récupérer la latitude et la longitude en fonction du nom de la ville
    const geocodingResponse = await fetch(
      `https://geocode.xyz/${cityInput}?json=1`
    );
    const geocodingData = await geocodingResponse.json();

    // Extraire la latitude et la longitude
    const { latt, longt } = geocodingData;

    // Récupérer les données météorologiques d'Open-Meteo
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    // Renvoyer les données météo dans la réponse
    return NextResponse.json(weatherData);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
