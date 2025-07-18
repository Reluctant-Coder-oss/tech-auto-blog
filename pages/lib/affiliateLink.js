export function insertAffiliateLink(productName) {
  const encoded = encodeURIComponent(productName);
  return `https://www.amazon.com/s?k=${encoded}&tag=YOURAFFILIATEID`;
}
