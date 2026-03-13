import { sel } from '../support/selectors.ios.js'
import { tapFirstThatExists, fillTextFieldByHint, scrollDown } from '../support/actions.js'

class AddressPage {
  async fillAndSave(address) {
    await fillTextFieldByHint('Full Name', address.fullName)
    await fillTextFieldByHint('Address', address.address1)
    await fillTextFieldByHint('City', address.city)
    await fillTextFieldByHint('State', address.state)
    await fillTextFieldByHint('Zip', address.zip)
    await fillTextFieldByHint('Country', address.country)

    if (address.phone) {
      await fillTextFieldByHint('Phone', address.phone)
    }

    await scrollDown(2)
    await tapFirstThatExists(sel.btnSaveAddressCandidates)
  }
}

export default new AddressPage()
