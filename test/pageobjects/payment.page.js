import { sel } from '../support/selectors.ios.js'
import { optionalTap, tapFirstThatExists, scrollDown } from '../support/actions.js'

class PaymentPage {
  async chooseCashOnDeliveryIfPresent() {
    await scrollDown(1)
    await optionalTap([sel.paymentCashOnDelivery], 3000)
  }

  async placeOrder() {
    await scrollDown(2)
    await tapFirstThatExists(sel.btnPlaceOrderCandidates)
  }
}

export default new PaymentPage()
