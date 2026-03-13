import { sel } from '../support/selectors.ios.js'
import { firstThatExists, tapFirstThatExists } from '../support/actions.js'

class CartPage {
  async continueToPayment() {
    await tapFirstThatExists(sel.btnCheckoutCandidates)
  }

  async needsAddress() {
    const found = await firstThatExists(sel.btnAddAddressCandidates)
    return Boolean(found)
  }

  async openAddAddress() {
    await tapFirstThatExists(sel.btnAddAddressCandidates)
  }
}

export default new CartPage()
