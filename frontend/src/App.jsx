import { useState } from "react";

export default function App() {
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  // رابط الـ Backend من Vercel Environment Variable
  const API_URL = import.meta.env.VITE_API_URL;

  const search = async () => {
    setError("");
    setVehicle(null);

    if (!vin) {
      setError("Please enter a VIN number");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/search?vin=${vin}`);
      const data = await res.json();

      if (!data) {
        setError("No vehicle found for this VIN");
      } else {
        setVehicle(data);
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "700px",
        margin: "auto"
      }}
    >
      <h1 style={{ textAlign: "center" }}>🚗 ProParts Demo</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Demo platform for vehicle spare parts matching
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Enter VIN number"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px"
          }}
        />
        <button
          onClick={search}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {vehicle && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px"
          }}
        >
          <h2>
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </h2>

          <h3>Compatible Parts</h3>
          <ul>
            {vehicle.parts.map((part) => (
              <li key={part.id}>
                {part.name} — <strong>{part.price} SAR</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

