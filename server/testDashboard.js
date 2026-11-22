const BASE_URL = "http://localhost:5000";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE3OTQ2MzM1MDcsImV4cCI6MTc5NDcxOTkwN30.0OlkWboebm88HX4Ul6hFhVWlaZUI8MxOIUeR5z2_Ttg";

const testDashboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/student/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Read response as text first
    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
    console.log("Raw Response:", text);

    // Check whether response is JSON
    try {
      const data = JSON.parse(text);
      console.log("JSON Response:", data);
    } catch (error) {
      console.log("Response is NOT JSON.");
      console.log("Check your API URL or Express routes.");
    }
  } catch (error) {
    console.error("Request Error:", error.message);
  }
};

testDashboard();
