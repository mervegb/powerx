import { DailyMetrics } from "../src/database";
import { calculateDailyPower } from "../src/utils";

describe('calculateDailyPower', () => {
    it('should calculate the correct average power for daily readings and round it', () => {
      const dailyMetrics: DailyMetrics = {
        '2022-04-13': {
          voltages: [1.34, 1.35],
          currents: [12, 14]
        }
      };
  
      const expected = [{
        time: '2022-04-13T00:00:00.000Z',
        name: 'Power',
        value: 17.49  
      }];
  
      const result = calculateDailyPower(dailyMetrics);
      expect(result).toEqual(expected);
    });
  });