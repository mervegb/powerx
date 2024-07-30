import express, { Express } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { addReading, getAllReadings } from './database';
import { calculateDailyPower, filterAndOrganizeReadings, parseLine } from './utils';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post('/data', async (req, res) => {
  const data = req.body;
  const lines = data.split('\n');
  
  for (const line of lines) {
    const reading = parseLine(line);
    if (!reading) {
      return res.json({ success: false });
    }
    const key = `${reading.timestamp.getTime()}_${reading.name}`;
    addReading(key, reading);
  }

  return res.json({ success: true });
});

app.get('/data', (req, res) => {
  const { from, to } = req.query;
  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
  }
  const allReadings = getAllReadings()
  const dailyMetrics = filterAndOrganizeReadings(allReadings, fromDate, toDate);
  const powerResults = calculateDailyPower(dailyMetrics);
  res.json(powerResults);
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
