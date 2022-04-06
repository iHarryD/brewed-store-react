import "./css/productListingPageStyle.css";
import { ProductCard } from "../cards/Cards";
import { FullPageLoader } from "../loaders/Loaders";
import FilterMenu from "../filterMenu/FilterMenu";
import ProductListingSection from "../productListingSection/ProductListingSection";
import ProductListingPageLogic from "./logic/ProductListingPageLogic";
import { ErrorToast } from "../toasts/Toasts";
import ElsePic from "../../assets/else-pp.jpg";

export default function ProductListingPage() {
  const { inViewProducts, allBrands, isLoading, caughtError } =
    ProductListingPageLogic();

  return (
    <>
      {isLoading && <FullPageLoader />}
      {caughtError && (
        <ErrorToast>
          <span>{caughtError}</span>
        </ErrorToast>
      )}
      <main className="--horizontal-flex">
        <FilterMenu allBrands={allBrands} />
        <ProductListingSection>
          {inViewProducts.map((product) => (
            <ProductCard
              title={product.name}
              currentPrice={product.currentPrice}
              mrp={product.price}
              discountPercent={product.discountPercent}
              rating={product.rating}
              imgSrc={product.img ? product.img : ElsePic}
              imgAlt={product.name}
              inStockQuantity={product.inStockQuantity}
              key={product.name}
            />
          ))}
        </ProductListingSection>
      </main>
    </>
  );
}
