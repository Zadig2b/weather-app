// app/api/weather/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const latt = url.searchParams.get("latitude");
    const longt = url.searchParams.get("longitude");

    if (!latt || !longt) {
      return NextResponse.json(
        { error: true, message: "Missing latitude or longitude" },
        { status: 400 }
      );
    }

    // Récupérer les données météo en utilisant la latitude et la longitude
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&hourly=visibility&daily=sunrise,sunset&timezone=auto&past_hours=1&forecast_hours=1`
    );

    // Vérifier si la demande météo a réussi
    if (!weatherResponse.ok) {
      throw new Error(
        `Weather request failed with status: ${weatherResponse.status}`
      );
    }

    const weatherData = await weatherResponse.json();

    // Renvoyer les données météo dans la réponse
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error:", error.message);

    // Envoyer une réponse d'erreur
    return NextResponse.json(
      { error: true, message: error.message || "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
