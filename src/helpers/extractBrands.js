export default function extractBrands(productsArray) {
  return productsArray.reduce((acc, product) => {
    if (acc.includes(product?.brand)) return acc;
    return [...acc, product.brand];
  }, []);
}
