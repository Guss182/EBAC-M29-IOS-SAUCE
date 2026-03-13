import { sel } from '../support/selectors.ios.js'
import { tapFirstThatExists, typeInto, typeIntoFirstThatExists } from '../support/actions.js'

class LoginPage {
  async login(email, password) {
    await typeInto(sel.email, email)
    await typeIntoFirstThatExists(sel.passwordCandidates, password)
    await tapFirstThatExists(sel.btnLoginCandidates)
  }
}

export default new LoginPage()
