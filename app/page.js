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
import { WeatherObject } from "../models/weatherModel";

import styles from "../styles/Home.module.css";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [cityInfo, setCityInfo] = useState(null);

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

          // Create an instance of WeatherObject using the data from the API
          const weatherObject = new WeatherObject(data);
          console.log("Weather Object:", weatherObject);

          setWeatherData(weatherObject);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      getData();
    }
  }, [cityInfo]);

  const changeSystem = () =>
    setUnitSystem((prevSystem) =>
      prevSystem === "metric" ? "imperial" : "metric"
    );

  if (!weatherData) {
    return <LoadingScreen loadingMessage="Chargement des données..." />;
  }

  // Error handling
  if (weatherData.message) {
    return (
      <ErrorScreen errorMessage="Ville non trouvée!">
        <p>
          La ville configurée n'a pas pu être trouvée. Veuillez vérifier le
          fichier de configuration.
        </p>
      </ErrorScreen>
    );
  }

  // Destructure necessary data from weatherData
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

  // Construct the icon name based on weather code and is_day
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
        />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
}
