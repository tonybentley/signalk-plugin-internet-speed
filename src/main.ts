import speedTest from 'speedtest-net';
import { TestResult } from './TestResult.interface';
import { ServerAPI } from 'signalk-server/lib/interfaces/plugins';
import { INTERVAL_MINUTES } from './constants';


let timeInterval: string | number | NodeJS.Timeout | undefined;

/**
 * @interface Options
 */
declare interface Options {
  /*
   interval in milliseconds for each speed test. Must be greater than 1 minute
  */
  interval: number,
}

/**
 * @class DefaultOptions
 */
class DefaultOptions implements Options {
  //every 60 seconds
  interval = INTERVAL_MINUTES
}

/**
 * @function stop for stopping the speec test interval
 */
export const stop = () => {
  clearInterval(timeInterval);
}

/**
 * @function main
 * @param options Options interface
 * @param app SignalK ServerAPI interface
 */
export const main = async (options: Options = new DefaultOptions(), app: ServerAPI) => {
  
  const interval = options.interval * 60000;
  app.debug(`Interval set to every ${options.interval} minutes`)

  const test = async () => {
    app.debug('Executing internet speed test')
    try {
      const result: TestResult = await speedTest(
        {
          acceptLicense: true
        },
      );
      app.debug(`Speed test results: ${JSON.stringify(result)}`)

      const downSpeed = (result.download.bandwidth/8) / 10000;
      const upSpeed = (result.upload.bandwidth/8) / 10000;
      
      app.handleMessage('signalk-plugin-internet-speed', {
        updates: [
          {
            values: [
              {
                path: 'internet.ping.jitter',
                value: result.ping.jitter,
                meta: {
                  description: 'Internet Test Ping Jitter'
                },
              },
              {
                path: 'internet.ping.latency',
                value: result.ping.latency,
                meta: {
                  description: 'Internet Test Ping Latency'
                },
              },
              {
                path: 'internet.packetLoss',
                value: result.packetLoss,
                meta: {
                  description: 'Internet Test Packet Loss'
                },
              },
              {
                path: 'internet.ISP',
                value: result.isp,
                meta: {
                  description: 'Internet Service Provider'
                },
              },
              {
                path: 'internet.speed.download',
                value: downSpeed,
                meta: {
                  units: 'mbps',
                  description: 'Download speed in megabits per second'
                },
              },
              {
                path: 'internet.speed.upload',
                value: upSpeed,
                meta: {
                  units: 'mbps',
                  description: 'Upload speed in megabits per second'
                  
                }
              }
            ]
          }
        ]
      })
    }
    catch (err: any) {
      app.error(err.message);
      throw err;
    }
  }

  //execute the speed test
  await test()
  //then run the test on interval
  app.debug('Running speed test on interval')
  timeInterval = setInterval(test, interval)
}
