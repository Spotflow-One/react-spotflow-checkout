import { v4 as uuidv4 } from "uuid";
export const generatePaymentReference = (): string => {
  const timestamp = Date.now().toString(36);
  const uid = uuidv4();
  return `SPF-${timestamp}-${uid}`.toUpperCase();
};
