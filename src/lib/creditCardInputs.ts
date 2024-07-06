function clearNumber(value = ""): string {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value: string): string {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);
  const nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
  return nextValue.trim();
}

export function unFormatCreditCardNumber(value: string): string {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);
  const nextValue = `${clearValue.slice(0, 4)}${clearValue.slice(4, 8)}${clearValue.slice(8, 12)}${clearValue.slice(12, 16)}`;
  return nextValue.trim();
}

export function formatCVC(value: string): string {
  const clearValue = clearNumber(value);
  const maxLength = 3;

  return clearValue.slice(0, maxLength);
}

// Function to format expiration date value
export function formatExpirationDate(value: string): string {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    // Format as MM/YY
    return `${clearValue.slice(0, 2)} / ${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}
