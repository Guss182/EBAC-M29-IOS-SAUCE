import { sauceConf } from './sauce.conf.js'
import { localConf } from './local.conf.js'
import 'dotenv/config'

const suites = {
  smoke: ['../test/specs/smoke.test.js'],
  login: ['../test/specs/login.test.js'],
  checkout: ['../test/specs/checkout.test.js']
}

function withSuites(base) {
  return { ...base, suites: { ...(base.suites || {}), ...suites } }
}

export const config = (() => {
  const env = process.env.ENVIRONMENT || 'saucelabs'
  if (env === 'local') return withSuites(localConf)
  return withSuites(sauceConf)
})()
