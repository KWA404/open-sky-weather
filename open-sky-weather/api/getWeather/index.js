// Azure Function to proxy weather API requests
// This keeps the API key secure and not exposed to the client

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  // Get the city from the query parameters
  const city = req.query.city || (req.body && req.body.city);
  
  if (!city) {
    context.res = {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        message: "Please provide a city name" 
      })
    };
    return;
  }

  try {
    // Set up CORS headers
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    // Handle OPTIONS request for CORS preflight
    if (req.method === "OPTIONS") {
      context.res = {
        status: 200,
        headers
      };
      return;
    }

    // Use the provided API key
    const apiKey = "567f1f2976a32306d3de30b0e0e47221";
    
    // Call the OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      context.res = {
        status: response.status,
        headers,
        body: JSON.stringify({ 
          message: data.message || "Error fetching weather data" 
        })
      };
      return;
    }

    // Return the weather data to the client
    context.res = {
      status: 200,
      headers,
      body: data
    };
  } catch (error) {
    context.log.error("Error processing request:", error);
    
    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        message: "Internal server error" 
      })
    };
  }
};