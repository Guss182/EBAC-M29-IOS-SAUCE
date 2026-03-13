import { generalConf } from './general.conf.js'

// Local iOS exige Mac + Xcode + simulador + Appium.
// Mantido só como "placeholder" (no Windows use Sauce).
export const localConf = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  specs: ['../test/specs/**/*.test.js'],

  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.IOS_DEVICE || 'iPhone 15',
      'appium:platformVersion': process.env.IOS_VERSION || '17.2',
      'appium:app': process.env.IOS_APP || `${process.cwd()}/app/LojaEBAC-sim.app`
    }
  ],

  ...generalConf
}
