import { $ } from '@wdio/globals'
import { sel } from '../support/selectors.ios.js'

class SuccessPage {
  async assertSuccess() {
    const msg = await $(sel.successMessage)
    await msg.waitForDisplayed({ timeout: 30000 })
  }
}

export default new SuccessPage()
