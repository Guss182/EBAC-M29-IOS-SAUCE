import { $$ } from '@wdio/globals'
import { sel } from '../support/selectors.ios.js'
import { typeInto } from '../support/actions.js'

class BrowsePage {
  async search(term) {
    await typeInto(sel.searchInput, term)
  }

  async openFirstProduct() {
    const items = await $$(sel.productCards)
    if (!items.length) {
      throw new Error('Nenhum produto encontrado na lista. Verifique selectors (productCards) ou o termo de busca.')
    }
    await items[0].click()
  }
}

export default new BrowsePage()
