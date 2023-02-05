import speedTest from 'speedtest-net';

declare interface Options {
  /*
   interval in milliseconds for each speed test. Must be greater than 1 minute
  */
  interval?: number,
  logLevel?: number,
}

export class DefaultOptions implements Options {
  //every 15 minutes
  //interval = 900000
  //every 60 seconds
  interval = 60000
  logLevel = 2
}
let interval: NodeJS.Timer;

export const stop = () => {
  clearInterval(interval);
}

export const main = async (options: Options = new DefaultOptions(), app: any) => {

  const test = async () => {
    app.debug('Executing speed test')
    try {
      const result = await speedTest(
        {
          acceptLicense: true,
          verbosity: options.logLevel
        },
      );
      app.debug('Speed test results: ')
      app.debug(result)

      app.handleMessage('my-signalk-plugin', {
        updates: [
          {
            values: [
              {
                path: 'communication.internet',
                value: result
              }
            ]
          }
        ]
      })
    }
    catch (err) {
      throw err;
    }
  }

  //execute the speed test
  await test()
  //then run the test on interval
  interval = setInterval(test, options.interval)
  
}

