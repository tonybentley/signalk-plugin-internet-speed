[![npm version](https://badge.fury.io/js/signalk-plugin-internet-speed.svg)](https://badge.fury.io/js/signalk-plugin-internet-speed)
[![npm license](https://img.shields.io/npm/l/signalk-server.svg)](https://www.npmjs.com/package/signalk-plugin-internet-speed)

[SignalK](http://signalk.org) Plugin for capturing internet speed data from Speedtest.net and writing the test results to the SignalK data model in the following deltas:

- internet.ISP - VPN host or ISP
- internet.packetLoss
- internet.ping.jitter
- internet.ping.latency
- internet.speed.download - Speed in megabits per second
- internet.speed.upload - Speed in megabits per second

# Installation

Navigate to the SignalK Server `AppStore -> Availble` link in the left bar navigation and search for `signalk-plugin-internet-speed`. See the [plugins documentation](https://github.com/SignalK/signalk-server/blob/master/SERVERPLUGINS.md) for further information. 

An initial speed test will run after restarting the server, and then use the default set interval of 10 minutes thereafter. 

# Plugin Settings

After installing, navigate to the SignalK Server `Server -> Plugin Config` link in the left bar navigation and you will see the `Internet Speed` panel with a dropdown for the `Number of minutes between speed tests`. You can modify this to set the speed test interval to how often you would like the speed test to run. 

# Contributing

Fork the Github repository, then submit a [pull request](https://github.com/tonybentley/signalk-plugin-internet-speed/pulls) from your fork into the original.