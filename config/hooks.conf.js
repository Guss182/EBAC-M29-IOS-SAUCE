// Hooks pensados para manter o app "limpo" entre testes no iOS (Sauce).
// Se você tiver algum problema aqui, você pode comentar o terminate/launch.
export const hooksConf = {
  afterTest: async function () {
    try {
      await driver.takeScreenshot()
    } catch {}

    // encerra o app para não "vazar" estado entre testes
    try {
      await driver.execute('mobile: terminateApp', { bundleId: 'br.com.lojaebac' })
    } catch {}
  },

  beforeTest: async function () {
    // garante que o app está aberto
    try {
      const state = await driver.queryAppState('br.com.lojaebac')
      // 4 = running in foreground
      if (state !== 4) {
        await driver.execute('mobile: launchApp', { bundleId: 'br.com.lojaebac' })
      }
    } catch {}
  }
}
