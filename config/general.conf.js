import { suitesConf } from './suites.conf.js'
export const generalConf = {
  maxInstances: 1,
  logLevel: 'info',
  waitforTimeout: 30000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 360000
  },

  reporters: ['spec']
}
