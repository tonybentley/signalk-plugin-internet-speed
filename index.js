/**
 * 
 * SignalK Plugin file
 */

import { main } from './dist/main';
import { INTERVAL_MINUTES } from './constants';

module.exports = function (app) {
  const plugin = {
    id: 'signalk-plugin-internet-speed',
    name: 'Internet Speed',
    description: 'Updates the signalk delta with intenet speed',
    start: (options, restartPlugin) => {
      app.debug(options)
      // Here we put our plugin logic
      app.debug('Plugin started');
      main.main(options, app);
    },
    stop: () => {
      main.stop();
      app.debug('Plugin stopped');
    },
    schema: {
      properties: {
        interval: {
          type: 'number',
          title: 'Number of minutes between speed tests',
          default: INTERVAL_MINUTES
        }
      }
    }
  };

  return plugin;
};