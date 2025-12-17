import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const catalog = [
  {
    vin: "1HGCM82633A004352",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=60",
    parts: [
      { id: 1, category: "Brakes", name: "Brake Pads", price: 220, sku: "BRK-220" },
      { id: 2, category: "Filters", name: "Oil Filter", price: 45, sku: "FLT-045" },
      { id: 3, category: "Engine", name: "Spark Plug (Set)", price: 180, sku: "ENG-180" },
      { id: 4, category: "Suspension", name: "Front Shock Absorber", price: 520, sku: "SUS-520" }
    ]
  },
  {
    vin: "WVWZZZ1JZXW000001",
    make: "Nissan",
    model: "Altima",
    year: 2020,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=60",
    parts: [
      { id: 5, category: "Filters", name: "Air Filter", price: 60, sku: "AIR-060" },
      { id: 6, category: "Engine", name: "Drive Belt", price: 155, sku: "ENG-155" },
      { id: 7, category: "Brakes", name: "Brake Disc", price: 340, sku: "BRK-340" },
      { id: 8, category: "Suspension", name: "Control Arm", price: 610, sku: "SUS-610" }
    ]
  }
];

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/search", (req, res) => {
  const vinRaw = (req.query.vin || "").toString();
  const make = (req.query.make || "").toString();
  const model = (req.query.model || "").toString();
  const year = (req.query.year || "").toString();

  const vin = vinRaw.trim().toUpperCase();

  let result = null;
  if (vin) {
    result = catalog.find(v => v.vin.toUpperCase() === vin) || null;
  } else if (make && model && year) {
    result = catalog.find(v =>
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase() &&
      String(v.year) === String(year)
    ) || null;
  }

  res.json(result);
});

app.get("/api/options", (req, res) => {
  const makes = [...new Set(catalog.map(v => v.make))].sort();
  const modelsByMake = {};
  for (const v of catalog) {
    modelsByMake[v.make] = modelsByMake[v.make] || new Set();
    modelsByMake[v.make].add(v.model);
  }
  const yearsByMakeModel = {};
  for (const v of catalog) {
    const key = `${v.make}__${v.model}`;
    yearsByMakeModel[key] = yearsByMakeModel[key] || new Set();
    yearsByMakeModel[key].add(v.year);
  }

  res.json({
    makes,
    modelsByMake: Object.fromEntries(Object.entries(modelsByMake).map(([k,s]) => [k, [...s].sort()])),
    yearsByMakeModel: Object.fromEntries(Object.entries(yearsByMakeModel).map(([k,s]) => [k, [...s].sort((a,b)=>a-b)]))
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("ProParts Demo Backend running on port", port));
