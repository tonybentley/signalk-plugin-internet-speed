import { execute } from './client';
import { TestResult } from './TestResult.interface';

export const speedTest = async(): Promise<TestResult> => {
  try {
    const speedtestOutput = await execute('speedtest --format=json');
    const result: TestResult = JSON.parse(speedtestOutput);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}