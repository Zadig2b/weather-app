"use client";
import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [cityInfo, setCityInfo] = useState(null);

  // Charger les informations de la ville depuis le fichier JSON
  useEffect(() => {
    const fetchCityInfo = async () => {
      try {
        const response = await fetch("/cityConfig.json");
        const data = await response.json();
        setCityInfo(data);
      } catch (error) {
        console.error("Error fetching city config:", error);
      }
    };

    fetchCityInfo();
  }, []);

  // Obtenir les données météorologiques lorsque cityInfo change
  useEffect(() => {
    if (cityInfo && cityInfo.city) {
      const getData = async () => {
        try {
          const res = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cityInput: cityInfo.city }),
          });
          const data = await res.json();
          console.log("API response:", data);

          // Extraire les données pertinentes de la réponse
          const {
            current_weather,
            current_weather_units,
            latitude,
            longitude,
            timezone,
            timezone_abbreviation,
            elevation,
            generationtime_ms,
            utc_offset_seconds,
          } = data;
          console.log("Extracted weather data:", {
            current_weather,
            current_weather_units,
            latitude,
            longitude,
            timezone,
            timezone_abbreviation,
            elevation,
            generationtime_ms,
            utc_offset_seconds,
          });

          // Mettre à jour l'état avec les nouvelles données météorologiques
          setWeatherData({
            current_weather,
            current_weather_units,
            latitude,
            longitude,
            timezone,
            timezone_abbreviation,
            elevation,
            generationtime_ms,
            utc_offset_seconds,
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      getData();
    }
  }, [cityInfo]);

  // Fonction pour changer le système d'unités
  const changeSystem = () =>
    setUnitSystem((prevSystem) =>
      prevSystem === "metric" ? "imperial" : "metric"
    );

  // Affichage pendant le chargement des données
  if (!weatherData) {
    return <LoadingScreen loadingMessage="Loading data..." />;
  }

  // Affichage en cas d'erreur avec les données météorologiques
  if (weatherData.message) {
    return (
      <ErrorScreen errorMessage="City not found, try again!">
        <p>
          La ville configurée n'a pas pu être trouvée. Veuillez vérifier le
          fichier de configuration.
        </p>
      </ErrorScreen>
    );
  }

  // Console log des données météorologiques avant le rendu
  console.log("Weather data before rendering:", weatherData);

  const {
    current_weather,
    current_weather_units,
    timezone,
    latitude,
    longitude,
    elevation,
  } = weatherData;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={cityInfo.city} // Nom de la ville configuré
        country={cityInfo.country} // Pays configuré
        description={`Weather code: ${current_weather.weathercode}`} // Description basée sur le code météo
        iconName={`icon-${current_weather.weathercode}`} // Nom de l'icône basé sur le code météo
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={current_weather} unitSystem={unitSystem} />
        </Header>
        <MetricsBox
          weatherData={current_weather}
          unitSystem={unitSystem}
          units={current_weather_units}
          latitude={latitude}
          longitude={longitude}
          elevation={elevation}
        />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
}
