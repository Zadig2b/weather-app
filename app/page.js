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
import { WeatherObject } from "../models/WeatherModel2";

import styles from "../styles/Home.module.css";
// Initial state for loading and errors
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
    // Fetch city info
    const fetchCityInfo = async () => {
      try {
        const response = await fetch("/cityConfig.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCityInfo(data);
      } catch (error) {
        console.error("Error fetching city config:", error);
        setError("Failed to fetch city config.");
      }
    };

    fetchCityInfo();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    // Fetch weather data when cityInfo changes
    const getData = async () => {
      if (!cityInfo || !cityInfo.city) {
        return; // Skip fetching if cityInfo is not available
      }

      setLoading(true); // Set loading state
      try {
        const res = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityInput: cityInfo.city }),
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("API response:", data);

        // Create an instance of WeatherObject using the data from the API
        const weatherObject = new WeatherObject(data);
        console.log("Weather Object:", weatherObject);

        setWeatherData(weatherObject);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getData();
  }, [cityInfo]); // Dependency array includes cityInfo

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
          {error === "Failed to fetch city config."
            ? "La ville configurée n'a pas pu être trouvée. Veuillez vérifier le fichier de configuration."
            : "Une erreur est survenue lors de la récupération des données météo."}
        </p>
      </ErrorScreen>
    );
  }

  // Déstructurer les données  de WeatherData
  const {
    latitude,
    longitude,
    elevation,
    current: {
      temperature_2m,
      apparent_temperature,
      relative_humidity_2m,
      wind_speed_10m,
      wind_direction_10m,
      is_day,
      weather_code,
      time,
    },
    currentUnits,
    daily: { sunrise, sunset },
    dailyUnits,
  } = weatherData;

  const visibility = weatherData.getVisibility();
  console.log("Visibilité:", visibility);

  // Construsctrion du nom de l'icône en fonction du code météo et de is_day
  const suffix = is_day === 1 ? "d" : "n";
  const iconName = `0${weather_code}${suffix}`;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={cityInfo.city}
        country={cityInfo.country || "N/A"}
        description={`Weather code: ${weather_code}`}
        iconName={iconName}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime
            time={time}
            unitSystem={unitSystem}
            timezone={weatherData.timezone}
            timezoneAbbreviation={weatherData.timezoneAbbreviation}
          />
        </Header>
        <MetricsBox
          temperature={temperature_2m}
          apparentTemperature={apparent_temperature}
          humidity={relative_humidity_2m}
          windSpeed={wind_speed_10m}
          windDirection={wind_direction_10m}
          units={currentUnits}
          latitude={latitude}
          longitude={longitude}
          elevation={elevation}
          sunrise={sunrise[0]}
          sunset={sunset[0]}
          unitSystem={unitSystem}
          visibility={visibility}
        />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
}
