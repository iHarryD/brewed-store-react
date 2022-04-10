import { useProduct } from "../../../contexts/productContext";
import { useFilter } from "../../../contexts/filterContext";
import useInView from "../../../hooks/useInView";

export default function ProductListingPageLogic() {
  const { allProducts, allBrands } = useProduct();
  const { filter } = useFilter();
  const { inViewProducts } = useInView(allProducts, filter);

  // useEffect(() => {
  //   if (!!allProducts.length) return;
  //   let isSubscriptionCancelled = false;
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://b-brewed-store.vercel.app/api/all-products"
  //       );
  //       if (Array.isArray(res.data) && !res.data.length) return;
  //       if (isSubscriptionCancelled) return;
  //       setAllProducts(() => skuHandler(res.data));
  //       setAllBrands(() => extractBrands(res.data));
  //     } catch (err) {
  //       setCaughtError(err?.response?.status || 500);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  //   return () => {
  //     isSubscriptionCancelled = true;
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!!products.allProducts.length) return;
  //   let isSubscriptionCancelled = false;
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://b-brewed-store.vercel.app/api/all-products"
  //       );
  //       if (Array.isArray(res.data) && !res.data.length) return;
  //       const updatedProducts = res.data.map((product) => {
  //         const num = Math.floor(Math.random() * (30 + 1) + 1);
  //         const toBePrice = !!product.sku.length
  //           ? product.sku[0].price
  //           : product.price;
  //         const image = product.img ? product.img : ElsePic;
  //         return {
  //           ...product,
  //           price: toBePrice,
  //           currentPrice: toBePrice - Math.floor((toBePrice / 100) * num),
  //           discountPercent: num,
  //           img: image,
  //         };
  //       });
  //       if (isSubscriptionCancelled) return;
  //       setProducts((prev) => ({ ...prev, allProducts: updatedProducts }));
  //       setAllBrands(() =>
  //         updatedProducts.reduce((acc, product) => {
  //           if (acc.includes(product?.brand)) return acc;
  //           return [...acc, product.brand];
  //         }, [])
  //       );
  //     } catch (err) {
  //       setCaughtError(err?.response?.status || 500);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  //   return () => {
  //     isSubscriptionCancelled = true;
  //   };
  // }, []);
  return { inViewProducts, allBrands };
}
