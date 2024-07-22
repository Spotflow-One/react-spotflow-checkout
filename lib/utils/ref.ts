export const generatePaymentReference = (): string => {
  const timestamp = Date.now().toString(36);
  const uid = "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
  return `SPF-${timestamp}-${uid}`.toUpperCase();
};
