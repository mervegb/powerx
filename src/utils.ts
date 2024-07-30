import { DailyMetrics, PowerResult, Reading, getAllReadings, getReading } from "./database";

export const parseLine = (line: string): Reading | null => {
    const [timestampStr, name, valueStr] = line.trim().split(' ');
  
    if (!timestampStr || !name || !valueStr) return null;
  
    const timestamp = new Date(Number(timestampStr) * 1000);
    if (isNaN(timestamp.getTime())) return null;
   
    if (!name) return null;
  
    const value = parseFloat(valueStr);
    if (isNaN(value)) return null;
  
    return { timestamp, name, value };
  };

 
export const getReadingsInRange = (from: Date, to: Date): Reading[] => {
    const readings: Reading[] = [];
    const allReadings = getAllReadings(); 
  
    for (const key in allReadings) {
      const reading = allReadings[key];
      if (reading.timestamp >= from && reading.timestamp <= to) {
        readings.push(reading);
      }
    }
    return readings;
  };


export const filterAndOrganizeReadings = (allReadings: Record<string, Reading>, fromDate: Date, toDate: Date): DailyMetrics => {
    let dailyMetrics: DailyMetrics = {};

    for (const key in allReadings) {
        const reading = allReadings[key];

        if (reading.timestamp >= fromDate && reading.timestamp <= toDate) {
            const dateKey = reading.timestamp.toISOString().split('T')[0]; 

            if (!dailyMetrics[dateKey]) {
                dailyMetrics[dateKey] = { voltages: [], currents: [] };
            }
            if (reading.name === "Voltage") {
                dailyMetrics[dateKey].voltages.push(reading.value);
            } else if (reading.name === "Current") {
                dailyMetrics[dateKey].currents.push(reading.value);
            }
        }
    }
    return dailyMetrics;
}


export const calculateDailyPower = (dailyMetrics: DailyMetrics): PowerResult[]  => {
    const results: PowerResult[] = [];
    for (const date in dailyMetrics) {
        const { voltages, currents } = dailyMetrics[date];

        const avgVoltage = voltages.reduce((a, b) => a + b, 0) / (voltages.length || 1);
        const avgCurrent = currents.reduce((a, b) => a + b, 0) / (currents.length || 1);
        const avgPower = avgVoltage * avgCurrent;

        const roundedPower = Math.round(avgPower * 100) / 100;

        results.push({
            time: `${date}T00:00:00.000Z`,
            name: "Power",
            value: roundedPower
        });
    }
    return results;
}