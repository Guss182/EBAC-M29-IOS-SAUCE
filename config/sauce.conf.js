import { generalConf } from './general.conf.js'
import 'dotenv/config'

const hostname = process.env.SAUCE_HOSTNAME || 'ondemand.us-west-1.saucelabs.com'
const appFilename = process.env.SAUCE_APP_FILENAME || 'LojaEBAC-sim.zip'
const deviceName = process.env.SAUCE_IOS_DEVICE || 'iPhone 14 Simulator'
const platformVersion = process.env.SAUCE_IOS_VERSION || '16.0'

export const sauceConf = {
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,

  protocol: 'https',
  hostname,
  port: 443,
  path: '/wd/hub',

  specs: ['../test/specs/**/*.test.js'],

  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': deviceName,
      'appium:platformVersion': platformVersion,
      'appium:app': `storage:filename=${appFilename}`,

      // estabilidade / performance em Mobile Virtual
      'appium:noReset': true,
      'appium:newCommandTimeout': 240,
      'appium:wdaLaunchTimeout': 180000,
      'appium:wdaConnectionTimeout': 180000,
      'appium:appWaitDuration': 180000,

      'sauce:options': {
        build: 'm29-ios-virtual',
        name: 'M29 iOS (Virtual) - WDIO',
        deviceOrientation: 'PORTRAIT',
        appiumVersion: '2.0.0'
      }
    }
  ],

  ...generalConf
}
