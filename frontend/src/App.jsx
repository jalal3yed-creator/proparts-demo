import React, { useState } from "react";

export default function App() {
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  // ✅ Fallback مضمون حتى لو Vercel لم يحقن المتغير
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://proparts-demo.onrender.com";

  const search = async () => {
    setError("");
    setVehicle(null);

    if (!vin) {
      setError("Please enter a VIN number");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/search?vin=${vin}`
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (!data) {
        setError("No vehicle found for this VIN");
      } else {
        setVehicle(data);
      }
    } catch (e) {
      setError("Cannot connect to backend");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        padding: "40px",
        background: "#f7f7f7"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>🚗 ProParts Demo</h1>
        <p style={{ textAlign: "center", color: "#666" }}>
          Investor demonstration – VIN based spare parts matching
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="Enter VIN number"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "16px"
            }}
          />
          <button
            onClick={search}
            style={{
              padding: "12px 24px",
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
          <div style={{ marginTop: "30px" }}>
            <h2>
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h2>

            <h3>Compatible Parts</h3>
            <ul>
              {vehicle.parts.map((p) => (
                <li key={p.id}>
                  {p.name} — <strong>{p.price} SAR</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
