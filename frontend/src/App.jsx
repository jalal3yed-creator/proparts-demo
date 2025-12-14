
import { useState } from 'react';

export default function App() {
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState(null);

  const search = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
const res = await fetch(`${API_URL}/api/search?vin=${vin}`);
    const data = await res.json();
    setVehicle(data);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 40 }}>
      <h1>🚗 ProParts Demo</h1>
      <p>Search vehicle by VIN</p>
      <input value={vin} onChange={e => setVin(e.target.value)} placeholder="Enter VIN" />
      <button onClick={search} style={{ marginLeft: 10 }}>Search</button>

      {vehicle && (
        <div style={{ marginTop: 30 }}>
          <h2>{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
          <ul>
            {vehicle.parts.map(p => (
              <li key={p.id}>{p.name} - {p.price} SAR</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
