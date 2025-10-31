#Forecaster - React Native Weather App

Forecaster is a modern weather application built with React Native. It provides real-time weather data, 5-day forecasts, and location-based search suggestions powered by the OpenWeatherMap API. The app features a clean UI with background imagery and smooth user interaction.

##Features

Search for any city and get live weather updates

Auto-suggestions for cities as you type

Display of current temperature, weather condition, and location

5-day weather forecast with daily temperature and condition

Background image and modern design

Handles loading and error states gracefully

##Screenshots

###HomeScreen
![HomeScreen](https://github.com/user-attachments/assets/f48350b9-1453-4d26-b74d-afc463cd9854)

###Search
![WhatsApp Image 2025-10-31 at 11 46 02 PM (1)](https://github.com/user-attachments/assets/562bdf90-7e8a-4642-81f7-bfd3e3f022e1)


##Tech Stack

Framework: React Native

UI: React Native components, ImageBackground

API: OpenWeatherMap API (Geocoding, Current Weather, and Forecast endpoints)

State Management: React Hooks (useState)

Navigation & Layout: React Native Safe Area Context, ScrollView, FlatList

##Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/forecaster-app.git
cd forecaster-app

2. Install Dependencies

Make sure you have Node.js and npm or yarn installed. Then run:

npm install


or

yarn install

3. Obtain an OpenWeatherMap API Key

Go to https://openweathermap.org/api

Create a free account

Generate an API key

Replace the placeholder in your code:

const API_KEY = "YOUR_API_KEY_HERE";

4. Run the App

To start the development server:

npm start


Then choose your preferred platform:

Press a for Android

Press i for iOS

Or scan the QR code in Expo Go (if using Expo)

Project Structure
.
├── assets/
│   └── bg.jpg                # Background image
├── App.js                    # Main app component
├── package.json
└── README.md

API Endpoints Used

Geocoding API
Used for fetching city suggestions

https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={API_KEY}


Current Weather API
Retrieves current weather data for a selected city

https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}


5-Day Forecast API
Provides 3-hour forecast data used to extract daily weather summaries

https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}

Screens and Functionality
Search Screen

Input field for city name

Auto-suggest dropdown for cities

On selecting a city, weather data is fetched and displayed

Weather Display

Shows city name, country, temperature, and weather condition

Displays corresponding weather icon

Smooth UI transitions during loading

Forecast Section

5-day forecast cards with temperature highs/lows and icons

Horizontal scroll for navigation

Error Handling

Displays appropriate messages when:

The city is not found

The API call fails (network issue)

Loading indicator while fetching data
