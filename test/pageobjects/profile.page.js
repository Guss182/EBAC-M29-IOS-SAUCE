import { $ } from '@wdio/globals'

class ProfilePage {
  profileName(name) {
    return $(`-ios predicate string:type == "XCUIElementTypeStaticText" AND label CONTAINS[c] "${name}"`)
  }
}

export default new ProfilePage()
