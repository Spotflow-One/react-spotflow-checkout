export function getCardType(cardNumber: string) {
  // Remove all non-digit characters from the card number
  cardNumber = cardNumber.replace(/\D/g, "");

  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    maestro: /^(?:5[06789]\d\d|6304|6390|67\d\d)\d{8,15}$/,
    // Verve card numbers usually start with 5061, 650002, 650027-650028, or 506(0-5) but ranges can be broader.
    verve: /^(5061|6500[02-27]|650002|650027|650028|506[0-5])[0-9]{10,17}$/,
  };

  for (const [cardType, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cardNumber)) {
      return cardType;
    }
    // return;
  }

  return "unknown";
}

/**
 * const cardPatterns = {
    Visa: /^4/,
    MasterCard: /^5[1-5]|^2(2[2-9]|[3-6]|7[01])/,
    "American Express": /^3[47]/,
    Discover: /^6(?:011|5|4[4-9]|22)/,
    UnionPay: /^62/,
    Verve: /^506099|^5061[0-8]|^50619|^6500[02]|^5078[6-9]|^65003[1-3]/,
  };

  
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    maestro: /^(?:5[06789]\d\d|6304|6390|67\d\d)\d{8,15}$/,
    // Verve card numbers usually start with 5061, 650002, 650027-650028, or 506(0-5) but ranges can be broader.
    verve: /^(5061|6500[02-27]|650002|650027|650028|506[0-5])[0-9]{10,17}$/,
  };



 */
