export const totalBRL = (assetData) => {
  const total = assetData
    .filter((c) => c.currency === "brl")
    .map((c) => c.value)
    .reduce((acc, num) => acc + num, 0);
  return total;
};

export const totalUSD = (assetData) => {
  const total = assetData
    .filter((c) => c.currency === "usd")
    .map((c) => c.value)
    .reduce((acc, num) => acc + num, 0);
  return total;
};
