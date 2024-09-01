import { NextResponse } from "next/server";

// Fonction pour effectuer le géocodage avec logique de réessai
async function fetchGeocoding(cityInput, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    const geocodingResponse = await fetch(
      `https://geocode.xyz/${cityInput}?json=1`
    );

    if (!geocodingResponse.ok) {
      throw new Error(
        `La requête de géocodage a échoué avec le statut : ${geocodingResponse.status}`
      );
    }

    const geocodingData = await geocodingResponse.json();

    // Vérifier la réponse "Throttled!" et réessayer si nécessaire
    if (
      geocodingData.latt &&
      geocodingData.longt &&
      !geocodingData.latt.includes("Throttled!")
    ) {
      return geocodingData;
    }

    // Si la réponse est "Throttled", attendre avant de réessayer
    console.warn(`Throttled! Nouvel essai dans ${delay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error(
    "Limite de réessais atteinte. La requête de géocodage a été limitée."
  );
}

export async function POST(req) {
  try {
    // Extraire cityInput du corps de la requête
    const { cityInput } = await req.json();

    // Récupérer les données de géocodage avec des réessais
    const { latt, longt } = await fetchGeocoding(cityInput);

    // Renvoyer les coordonnées
    return NextResponse.json({ latt, longt });
  } catch (error) {
    console.error("Erreur :", error.message);

    // Envoyer une réponse d'erreur appropriée
    return NextResponse.json(
      {
        error: true,
        message:
          error.message || "Échec de la récupération des données de géocodage",
      },
      { status: 500 }
    );
  }
}
