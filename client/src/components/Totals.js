export const totalBRL = (assetList) => {
  const total = Array(assetList)
    .filter((c) => c.currency === "brl")
    .map((c) => c.value)
    .reduce((acc, num) => acc + num, 0);
  return total;
};

export const totalUSD = (assetList) => {
  const total = Array(assetList)
    .filter((c) => c.currency === "usd")
    .map((c) => c.value)
    .reduce((acc, num) => acc + num, 0);
  return total;
};
