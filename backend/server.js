
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const vehicles = [
  {
    vin: "1HGCM82633A004352",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    parts: [
      { id: 1, name: "Brake Pads", price: 220 },
      { id: 2, name: "Oil Filter", price: 45 }
    ]
  },
  {
    vin: "WVWZZZ1JZXW000001",
    make: "Nissan",
    model: "Altima",
    year: 2020,
    parts: [
      { id: 3, name: "Air Filter", price: 60 },
      { id: 4, name: "Spark Plug", price: 35 }
    ]
  }
];

app.get('/api/search', (req, res) => {
  const { vin, make, model, year } = req.query;
  const result = vehicles.find(v =>
    (vin && v.vin === vin) ||
    (make && model && year &&
     v.make === make && v.model === model && v.year == year)
  );
  res.json(result || null);
});

app.listen(4000, () => {
  console.log("ProParts Demo Backend running on port 4000");
});
