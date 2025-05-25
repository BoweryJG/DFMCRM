import express from 'express';
declare var process: any;

interface Property {
  id: string;
  address: string;
  status: 'occupied' | 'vacant' | 'maintenance';
}

const app = express();
app.use(express.json());

const properties: Property[] = [
  { id: '1', address: '123 Main St', status: 'occupied' },
  { id: '2', address: '456 Oak Ave', status: 'vacant' }
];

app.get('/properties', (_req: any, res: any) => {
  res.json(properties);
});

app.post('/properties', (req: any, res: any) => {
  const newProperty: Property = req.body;
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

const port = (process as any).env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
