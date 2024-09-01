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
import { WeatherObject } from "../models/WeatherModel3";

import styles from "../styles/Home.module.css";

// État initial pour le chargement et les erreurs
const initialState = {
  cityInfo: null,
  weatherData: null,
  loading: true,
  error: null,
};

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les informations de la ville
    const fetchCityInfo = async () => {
      try {
        const response = await fetch("/cityConfig.json");
        if (!response.ok) {
          throw new Error("La réponse du réseau n'était pas correcte");
        }
        const data = await response.json();
        setCityInfo(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la configuration de la ville :",
          error
        );
        setError("Échec de la récupération de la configuration de la ville.");
      }
    };

    fetchCityInfo();
  }, []); // Ne s'exécute qu'une seule fois lors du montage du composant

  useEffect(() => {
    // Récupérer les données météo lorsque cityInfo change
    const getData = async () => {
      if (!cityInfo || !cityInfo.city) {
        return; // Passer la récupération si cityInfo n'est pas disponible
      }

      setLoading(true); // Définir l'état de chargement
      try {
        // Étape 1 : Récupérer les coordonnées géographiques de la ville
        const geocodingResponse = await fetch("/api/geocoding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityInput: cityInfo.city }),
        });

        if (!geocodingResponse.ok) {
          throw new Error(
            "La réponse du réseau pour le géocodage n'était pas correcte"
          );
        }

        const { latt, longt } = await geocodingResponse.json();

        // Étape 2 : Récupérer les données météorologiques en utilisant les coordonnées
        const weatherResponse = await fetch(
          `/api/weather?latitude=${latt}&longitude=${longt}`
        );

        if (!weatherResponse.ok) {
          throw new Error(
            "La réponse du réseau pour les données météorologiques n'était pas correcte"
          );
        }

        const data = await weatherResponse.json();
        console.log("Réponse de l'API :", data);

        // Créer une instance de WeatherObject à partir des données de l'API
        const weatherObject = new WeatherObject(data);
        console.log("Objet Météo :", weatherObject);

        setWeatherData(weatherObject);
        setError(null); // Effacer toute erreur précédente
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données météorologiques :",
          error
        );
        setError("Échec de la récupération des données météorologiques.");
      } finally {
        setLoading(false); // Définir le chargement sur false après la récupération
      }
    };

    getData();
  }, [cityInfo]); // Le tableau de dépendances inclut cityInfo

  // Fonction pour changer le système d'unités
  const changeSystem = () =>
    setUnitSystem((prevSystem) =>
      prevSystem === "metric" ? "imperial" : "metric"
    );

  if (loading) {
    return <LoadingScreen loadingMessage="Chargement des données..." />;
  }

  if (error) {
    return (
      <ErrorScreen errorMessage={error}>
        <p>
          {error === "Échec de la récupération de la configuration de la ville."
            ? "La ville configurée n'a pas pu être trouvée. Veuillez vérifier le fichier de configuration."
            : "Une erreur est survenue lors de la récupération des données météo."}
        </p>
      </ErrorScreen>
    );
  }

  // Construction du nom de l'icône en fonction du code météo et de is_day
  const suffix = weatherData.current.isDay === 1 ? "d" : "n";
  const iconName =
    weatherData.current.weatherCode.length >= 2
      ? `${weatherData.current.weatherCode}${suffix}`
      : `0${weatherData.current.weatherCode}${suffix}`;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={cityInfo.city}
        country={cityInfo.country || "N/A"}
        iconName={iconName}
        unitSystem={unitSystem}
        weatherData={weatherData}
        feelsLike={weatherData.current.apparentTemperature}
        temperature={weatherData.current.temperature2m}
      />
      <ContentBox>
        <Header>
          <DateAndTime
            time={weatherData.current.time}
            unitSystem={unitSystem}
            timezone={weatherData.timezone}
            timezoneAbbreviation={weatherData.timezoneAbbreviation}
          />
        </Header>
        <MetricsBox
          temperature={weatherData.current.temperature2m}
          apparentTemperature={weatherData.current.apparentTemperature}
          humidity={weatherData.current.relativeHumidity2m}
          windSpeed={weatherData.current.windSpeed10m}
          windDirection={weatherData.current.windDirection10m}
          units={weatherData.currentUnits}
          latitude={weatherData.latitude}
          longitude={weatherData.longitude}
          elevation={weatherData.elevation}
          sunrise={weatherData.daily.sunrise[0]}
          sunset={weatherData.daily.sunset[0]}
          unitSystem={unitSystem}
          visibility={weatherData.getVisibility()}
        />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
}
