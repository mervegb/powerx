export interface Reading {
  timestamp: Date;
  name: string;
  value: number;
}

export interface DailyMetrics {
  [date: string]: {
      voltages: number[];
      currents: number[];
  };
}

export interface PowerResult {
  time: string;
  name: string;
  value: number;
}

// This is a fake database which stores data in-memory while the process is running
// Feel free to change the data structure to anything else you would like
const database: Record<string, Reading> = {};

/**
 * Store a reading in the database using the given key
 */
export const addReading = (key: string, reading: Reading): Reading => {
  database[key] = reading;
  return reading;
};

/**
 * Retrieve a reading from the database using the given key
 */
export const getReading = (key: string): Reading | undefined => {
  return database[key];
};

/**
 * Retrieve all readings
 */
export const getAllReadings = (): Record<string, Reading> => {
  return database;
};