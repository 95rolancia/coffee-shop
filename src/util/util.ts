export const numberCommaFormat = (price: string): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
