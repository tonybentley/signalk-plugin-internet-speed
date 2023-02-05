/**
 * 
 * SignalK Plugin file
 */

 const main = require('./dist/main');

// declare interface SignalKPlugin {
//   id: string,
//   name: string,
//   description: string,
//   start: Function,
//   stop: Function,
//   schema: any,
// }

module.exports = function (app) {
  const plugin = {
    id: 'signalk-plugin-internet-speed',
    name: 'Internet Speed Delta',
    description: 'Updates the signalk delta with intenet speed',
    start: (options, restartPlugin) => {
      // Here we put our plugin logic
      app.debug('Plugin started');
      main.main(undefined, app);
    },
    stop: () => {
      main.stop();
      app.debug('Plugin stopped');
    },
    schema: {}
  };

  return plugin;
};