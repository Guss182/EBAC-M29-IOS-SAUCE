import { $ } from '@wdio/globals'

async function clickWithRetry(selector, timeoutMs = 20000, retries = 2) {
  let lastErr
  for (let i = 0; i <= retries; i++) {
    try {
      const el = await $(selector)
      await el.waitForDisplayed({ timeout: timeoutMs })
      await el.click()
      return
    } catch (err) {
      lastErr = err
      const msg = String(err?.message || err).toLowerCase()
      if (msg.includes('stale') || msg.includes('detached')) continue
      throw err
    }
  }
  throw lastErr
}

export async function tap(selector, timeoutMs = 20000) {
  await clickWithRetry(selector, timeoutMs)
}

export async function typeInto(selector, value, timeoutMs = 20000) {
  const el = await $(selector)
  await el.waitForDisplayed({ timeout: timeoutMs })
  await el.setValue(value)
}

export async function firstThatExists(selectors = []) {
  for (const s of selectors) {
    const el = await $(s)
    if (await el.isExisting()) return { selector: s, el }
  }
  return null
}

export async function tapFirstThatExists(selectors = [], timeoutMs = 20000) {
  const found = await firstThatExists(selectors)
  if (!found) throw new Error(`Nenhum selector encontrado: ${selectors.join(' | ')}`)
  await clickWithRetry(found.selector, timeoutMs, 2)
  return found.selector
}

export async function waitForAny(selectors = [], timeoutMs = 20000, pollMs = 500) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    for (const s of selectors) {
      const el = await $(s)
      if (await el.isExisting()) {
        try {
          await el.waitForDisplayed({ timeout: Math.min(2000, timeoutMs) })
          return el
        } catch {}
      }
    }
    await new Promise(r => setTimeout(r, pollMs))
  }
  throw new Error(`Timeout esperando algum elemento. Tentativas: ${selectors.join(' | ')}`)
}

export async function scrollDown(times = 2) {
  for (let i = 0; i < times; i++) {
    try { await driver.execute('mobile: scroll', { direction: 'down' }) } catch {}
  }
}

export async function safeScreenshot(name = 'evidence') {
  try {
    await driver.saveScreenshot(`./screenshots/${Date.now()}_${name}.png`)
  } catch {}
}

/**
 * Reset leve (sem fullReset) para evitar estado/cookies/flakiness.
 * Útil em Sauce Virtual.
 */
export async function softResetApp(bundleId = 'br.com.lojaebac') {
  try { await driver.execute('mobile: terminateApp', { bundleId }) } catch {}
  try { await driver.pause(1500) } catch {}
  try { await driver.execute('mobile: activateApp', { bundleId }) } catch {}
  try { await driver.pause(2500) } catch {}
}
