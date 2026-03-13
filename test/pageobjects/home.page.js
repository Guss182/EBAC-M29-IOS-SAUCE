import { $$ } from '@wdio/globals'
import { sel } from '../support/selectors.ios.js'
import { tapFirstThatExists } from '../support/actions.js'

class HomePage {
  async openMenu(menu) {
    // 1) Tenta por selectors (id/accessibility/predicate)
    try {
      await tapFirstThatExists(sel.tabCandidates(menu), 20000)
      return
    } catch {}

    // 2) Fallback por índice no TabBar (última aba costuma ser conta/perfil)
    const buttons = await $$('-ios class chain:**/XCUIElementTypeTabBar/**/XCUIElementTypeButton')
    if (!buttons.length) {
      throw new Error('TabBar não encontrada. O app pode não ter carregado a barra inferior.')
    }

    const idxMap = {
      Home: 0,
      Browse: Math.min(1, buttons.length - 1),
      Order: Math.min(2, buttons.length - 1),
      Profile: buttons.length - 1,
      Account: buttons.length - 1
    }
    const idx = idxMap[menu] ?? (buttons.length - 1)
    await buttons[idx].click()
  }
}

export default new HomePage()
