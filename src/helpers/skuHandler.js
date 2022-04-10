import ElsePic from "../assets/else-pp.jpg";

export default function skuHandler(productsArray) {
  if (Array.isArray(productsArray) && !productsArray.length) return;
  const updatedProducts = productsArray.map((product) => {
    const num = Math.floor(Math.random() * (30 + 1) + 1);
    const toBePrice = !!product.sku.length
      ? product.sku[0].price
      : product.price;
    const toBeStockQuantity = !!product.sku.length
      ? product.sku[0].inStockQuantity
      : product.inStockQuantity;
    const image = product.img ? product.img : ElsePic;
    return {
      ...product,
      price: toBePrice,
      currentPrice: toBePrice - Math.floor((toBePrice / 100) * num),
      discountPercent: num,
      inStockQuantity: toBeStockQuantity,
      img: image,
    };
  });
  return updatedProducts;
}
