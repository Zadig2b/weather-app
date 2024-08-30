import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Extract cityInput from the request body
    const { cityInput } = await req.json();

    // Fetch latitude and longitude using the city name
    const geocodingResponse = await fetch(
      `https://geocode.xyz/${cityInput}?json=1`
    );

    // Check if the geocoding request was successful
    if (!geocodingResponse.ok) {
      throw new Error(
        `Geocoding request failed with status: ${geocodingResponse.status}`
      );
    }

    const geocodingData = await geocodingResponse.json();

    // Handle cases where geocoding might return an error or throttle
    if (geocodingData.error || !geocodingData.latt || !geocodingData.longt) {
      throw new Error(
        `Geocoding failed: ${geocodingData.reason || "Invalid response data"}`
      );
    }

    // Extract latitude and longitude
    const { latt, longt } = geocodingData;

    // Fetch weather data using the latitude and longitude
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&current_weather=true`
      // `https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${longt}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=auto`
    );

    // Check if the weather request was successful
    if (!weatherResponse.ok) {
      throw new Error(
        `Weather request failed with status: ${weatherResponse.status}`
      );
    }

    const weatherData = await weatherResponse.json();

    // Return weather data in the response
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error:", error.message);

    // Send a proper error response
    return NextResponse.json(
      { error: true, message: error.message || "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
