import { sel } from '../support/selectors.ios.js'
import { tapFirstThatExists, scrollDown } from '../support/actions.js'

class ProductPage {
  async addToCart() {
    // alguns apps colocam o botão mais pra baixo
    await scrollDown(2)
    await tapFirstThatExists(sel.btnAddToCartCandidates)
  }
}

export default new ProductPage()
