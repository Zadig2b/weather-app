// app/api/geocoding/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extraire cityInput du corps de la requête
    const { cityInput } = await req.json();

    // Récupérer la latitude et la longitude en utilisant le nom de la ville
    const geocodingResponse = await fetch(
      `https://geocode.xyz/${cityInput}?json=1`
    );

    // Vérifiez si la demande de géocodage a réussi
    if (!geocodingResponse.ok) {
      throw new Error(
        `Geocoding request failed with status: ${geocodingResponse.status}`
      );
    }

    const geocodingData = await geocodingResponse.json();

    // Gérer les cas où le géocodage peut renvoyer une erreur ou des données manquantes
    if (geocodingData.error || !geocodingData.latt || !geocodingData.longt) {
      throw new Error(
        `Geocoding failed: ${geocodingData.reason || "Invalid response data"}`
      );
    }

    // Extraire la latitude et la longitude
    const { latt, longt } = geocodingData;

    // Renvoyer les coordonnées
    return NextResponse.json({ latt, longt });
  } catch (error) {
    console.error("Error:", error.message);

    // Envoyer une réponse d'erreur appropriée
    return NextResponse.json(
      {
        error: true,
        message: error.message || "Failed to fetch geocoding data",
      },
      { status: 500 }
    );
  }
}
