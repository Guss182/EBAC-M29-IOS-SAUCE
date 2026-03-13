/**
 * Selectors iOS (XCUITest) - com fallback para reduzir flakiness no Sauce.
 * Padrão: use listas de candidatos e tente o primeiro que existir.
 */
export const sel = {
  // Tabs do app: alguns builds não expõem id/label (há fallback por índice no HomePage)
  tabCandidates: (menu) => {
    const synonyms = {
      Profile: ['Profile', 'Account', 'Me', 'User', 'Perfil', 'Conta'],
      Account: ['Account', 'Profile', 'Me', 'User', 'Perfil', 'Conta'],
      Home: ['Home', 'Início', 'Inicio'],
      Browse: ['Browse', 'Shop', 'Loja'],
      Order: ['Order', 'Cart', 'Carrinho']
    }
    const names = synonyms[menu] || [menu]
    const preds = names
      .map(n => `(name CONTAINS[c] "${n}" OR label CONTAINS[c] "${n}" OR value CONTAINS[c] "${n}")`)
      .join(' OR ')
    return [
      ...names.flatMap(n => [`id:tab-${n}`, `id:tab-${n.toLowerCase()}`, `~${n}`, `~${n.toLowerCase()}`]),
      `-ios predicate string:type == "XCUIElementTypeButton" AND (${preds})`
    ]
  },

  // Login
  emailCandidates: [
    'id:email',
    '~email',
    '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "mail" OR label CONTAINS[c] "mail" OR value CONTAINS[c] "mail")',
    '-ios predicate string:type == "XCUIElementTypeTextField" AND (value CONTAINS[c] "@")'
  ],
  passwordCandidates: [
    'id:password',
    '~password',
    '-ios predicate string:type == "XCUIElementTypeSecureTextField" AND (name CONTAINS[c] "pass" OR label CONTAINS[c] "pass" OR value CONTAINS[c] "pass")'
  ],
  btnLoginCandidates: [
    '~Login',
    '~btnLogin',
    '-ios predicate string:type == "XCUIElementTypeButton" AND (label CONTAINS[c] "login" OR name CONTAINS[c] "login" OR label CONTAINS[c] "entrar" OR name CONTAINS[c] "entrar")'
  ],

  // Home/Browse (opcional)
  homeSearchCandidates: [
    '-ios predicate string:type == "XCUIElementTypeSearchField"',
    '-ios predicate string:(value CONTAINS[c] "Search" OR label CONTAINS[c] "Search" OR name CONTAINS[c] "Search")'
  ],

  // Product list / cards
  productCardCandidates: [
    'id:productDetails',
    '-ios class chain:**/XCUIElementTypeCollectionView/**/XCUIElementTypeCell',
    '-ios class chain:**/XCUIElementTypeTable/**/XCUIElementTypeCell',
    '-ios predicate string:type == "XCUIElementTypeCell"'
  ],

  // Product details
  btnAddToCartCandidates: [
    '~btnAddToCart',
    '~Add To Cart',
    '~Add to Cart',
    '//XCUIElementTypeButton[@name="addToCart"]',
    '-ios predicate string:type == "XCUIElementTypeButton" AND (label CONTAINS[c] "add" AND label CONTAINS[c] "cart")'
  ],

  // Quantity (se necessário)
  quantityCandidates: [
    '~quantityField',
    'id:quantity',
    '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "qty" OR label CONTAINS[c] "qty" OR name CONTAINS[c] "quantity" OR label CONTAINS[c] "quantity")'
  ],

  // Cart / Checkout
  btnCheckoutCandidates: [
    '~Checkout',
    '~Proceed To Checkout',
    '-ios predicate string:type == "XCUIElementTypeButton" AND label CONTAINS[c] "checkout"'
  ],

  // Address
  btnAddAddressCandidates: [
    '~Add Address',
    '-ios predicate string:type == "XCUIElementTypeButton" AND (label CONTAINS[c] "address" AND label CONTAINS[c] "add")'
  ],
  btnSaveAddressCandidates: [
    '~Save Address',
    '~Save',
    '-ios predicate string:type == "XCUIElementTypeButton" AND label CONTAINS[c] "save"'
  ],

  // Payment
  paymentCashOnDelivery: '-ios predicate string:(label CONTAINS[c] "Cash" AND label CONTAINS[c] "Delivery") OR (name CONTAINS[c] "Cash" AND name CONTAINS[c] "Delivery")',
  btnPlaceOrderCandidates: [
    '~Place Order',
    '-ios predicate string:type == "XCUIElementTypeButton" AND (label CONTAINS[c] "place" OR label CONTAINS[c] "order" OR label CONTAINS[c] "checkout")'
  ],

  // Success
  successMessageCandidates: [
    '-ios predicate string:(label CONTAINS[c] "success" OR name CONTAINS[c] "success" OR label CONTAINS[c] "thank" OR label CONTAINS[c] "pedido")'
  ]
}
