import express, { Express } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { addReading } from './database';
import { parseLine } from './utils';

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

  return res.json({ success: false });
});

app.get('/data', async (req, res) => {
  // TODO: check what dates have been requested, and retrieve all data within the given range

  // getReading(...)

  return res.json({ success: false });
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
