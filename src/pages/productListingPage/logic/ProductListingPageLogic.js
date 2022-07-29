import { useProduct } from "../../../contexts/productContext";
import { useFilter } from "../../../contexts/filterContext";
import useInView from "../../../hooks/useInView";

export default function ProductListingPageLogic() {
  const { allProducts, allBrands } = useProduct();
  const { filter } = useFilter();
  const { inViewProducts } = useInView(allProducts, filter);

  return { inViewProducts, allBrands };
}
