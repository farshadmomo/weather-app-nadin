import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface OpenWeatherCondition {
  description: string;
  main: string;
}

interface OpenWeatherCurrentWeather {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: OpenWeatherCondition[];
  wind: {
    speed: number;
  };
  name: string;
}

interface OpenWeatherForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: OpenWeatherCondition[];
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
}

export const getCurrentWeather = async (
  city: string
): Promise<OpenWeatherCurrentWeather> => {
  try {
    const response = await axios.get<OpenWeatherCurrentWeather>(
      `${BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getWeatherForecast = async (
  city: string
): Promise<OpenWeatherForecastItem[]> => {
  try {
    const response = await axios.get<OpenWeatherForecastResponse>(
      `${BASE_URL}/forecast`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return response.data.list;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
};
