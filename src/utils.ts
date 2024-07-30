import { Reading } from "./database";

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

 