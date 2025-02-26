import React, { useState } from "react";

const DynamicStateDependency = () => {
  // Initial data for countries and cities
  const countryData = [
    {
      name: "USA",
      cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    },
    {
      name: "India",
      cities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
    },
    {
      name: "Canada",
      cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    },
  ];

  // State to hold selected country and cities based on that country
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Handler for country selection
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // Find the cities for the selected country
    const countryObj = countryData.find((item) => item.name === country);
    if (countryObj) {
      setCities(countryObj.cities);  // Update cities state
      setSelectedCity("");  // Reset selected city
    } else {
      setCities([]);  // If no country is selected, reset cities
      setSelectedCity("");  // Reset city
    }
  };

  // Handler for city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2>Select Country and City</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Country:</label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          style={styles.select}
        >
          <option value="">Select a country</option>
          {countryData.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>City:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          style={styles.select}
          disabled={!selectedCountry}  // Disable city dropdown if no country selected
        >
          <option value="">Select a city</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    borderRadius: "10px",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#333",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
    outline: "none",
    cursor: "pointer",
  },
};

export default DynamicStateDependency;
