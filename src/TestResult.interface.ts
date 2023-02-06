declare interface Ping {
  jitter: number,
  latency: number
}
declare interface Load {
  bandwidth: number,
  bytes: number, 
  elapsed: number
}
declare interface Interface {
  internalIp: string,
  name: string, 
  macAddr: string,
  isVpn: boolean,
  externalIp: string
}

declare interface Server {
  id: number,
  name: string,
  location: string,
  country: string, 
  host: string,
  port: number,
  ip: string
}
declare interface Result {
  id: string,
  url: string
}

export interface TestResult {
  timestamp: Date,
  ping: Ping,
  download: Load,
  upload: Load,
  packetLoss: number,
  isp: string,
  interface: Interface,
  server: Server,
  result: Result
}
