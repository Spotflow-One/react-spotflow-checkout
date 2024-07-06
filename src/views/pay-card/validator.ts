export {};

export const cardValidator = (value: {
  cvv: string;
  expiry: string;
  card: string;
}) => {
  return (
    value.cvv.length === 3 &&
    value.expiry.length === 7 &&
    value.card.length === 19
  );
};
