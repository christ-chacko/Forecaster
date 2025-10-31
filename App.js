import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const API_KEY = "YOUR_OPENWEATHER_API_KEY";

export default function App() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch city suggestions as user types
  const fetchSuggestions = async (text) => {
    setCity(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (e) {
      console.log("Suggestion error:", e);
    }
  };

  // 🔹 Fetch weather data using selected suggestion
  const fetchWeather = async (selectedCity) => {
    const name = selectedCity?.name || city;
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const res1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${API_KEY}`
      );
      const data1 = await res1.json();
      if (data1.cod !== 200) {
        setError("City not found ❌");
        setLoading(false);
        return;
      }
      setCurrent(data1);

      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${API_KEY}`
      );
      const data2 = await res2.json();

      const daily = [];
      const seen = new Set();
      for (const item of data2.list) {
        const [date, time] = item.dt_txt.split(" ");
        if (!seen.has(date) && time === "12:00:00") {
          daily.push(item);
          seen.add(date);
        }
      }
      setForecast(daily.slice(0, 5));
    } catch (e) {
      setError("Network error ⚠️");
    }
    setLoading(false);
  };

  return (

  <ImageBackground
  source={require("./assets/bg.jpg")} 
  resizeMode="cover"
  style={{ flex: 1 }}
>
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: 16 }}>
      <Text style={{fontSize: 30, fontWeight:"bold", color:"white"}}>🌤️ Forecaster</Text>


      {/* Search Bar */}

      
      <View style={{ marginTop: 24 }}>
        <TextInput
          value={city}
          onChangeText={fetchSuggestions}
          placeholder="Enter city name..."
          style={{
            backgroundColor: "#D8DDE4",
            borderRadius: 12,
            padding: 12,
            fontSize: 16,
          }}
        />

        {/* 🔹 Suggestion dropdown */}
        {suggestions.length > 0 && (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: 4,
              elevation: 3,
              padding: 4,
            }}
          >
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderBottomWidth: index < suggestions.length - 1 ? 1 : 0,
                  borderBottomColor: "#e5e7eb",
                }}
                onPress={() => {
                  setCity(item.name);
                  fetchWeather(item);
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {item.name}, {item.country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      

      {/* Rest of your existing weather + forecast UI */}
      {loading && <ActivityIndicator size="large" color="#0284C7" style={{ marginTop: 30 }} />}
      {error ? <Text style={{ color: "red", textAlign: "center", marginTop: 16 }}>{error}</Text> : null}

      {current && (
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#BCC6D5" }}>
            {current.name}, {current.sys.country}
          </Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png` }}
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ fontSize: 56, fontWeight: "bold", color: "#BCC6D5" }}>
            {Math.round(current.main.temp)}°C
          </Text>
          <Text style={{ fontSize: 18, textTransform: "capitalize", color: "#BCC6D5" }}>
            {current.weather[0].description}
          </Text>
        </View>
      )}

      {forecast.length > 0 && (
        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              color: "#BCC6D5",
              marginBottom: 12,
            }}
          >
            5-Day Forecast
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {forecast.map((day, i) => {
              const date = new Date(day.dt * 1000);
              const name = date.toLocaleDateString("en-US", { weekday: "short" });
              return (
                <View
                  key={i}
                  style={{
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 12,
                    marginHorizontal: 6,
                    width: 110,
                  }}
                >
                  <Text style={{ color: "#0284C7", fontWeight: "600" }}>{name}</Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                    }}
                    style={{ width: 60, height: 60 }}
                  />
                  <Text style={{ color: "#475569", textTransform: "capitalize" }}>
                    {day.weather[0].main}
                  </Text>
                  <Text style={{ color: "#0369A1", fontWeight: "bold" }}>
                    {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
    </ImageBackground>
  );
}
