import { useEffect, useState } from "react";

export default function useFilter(originalArray, filters) {
  const [inViewProducts, setInViewProducts] = useState([]);

  useEffect(() => {
    if (!Array.isArray(originalArray) && !originalArray.length) return;
    getInViewProducts(originalArray, filters);
  }, [filters, originalArray]);

  function getInViewProducts() {
    let toReturn = [...originalArray];
    if (!filters.allFilters.includeOutOfStock) {
      toReturn = toReturn.filter((product) => product.inStockQuantity > 0);
    }
    if (filters.allFilters.showFlashDeliveryOnly) {
      toReturn = toReturn.filter((product) => product.flashDeliverable);
    }
    if (!!filters.allFilters.brand.length) {
      toReturn = toReturn.filter((product) =>
        filters.allFilters.brand.includes(product.brand)
      );
    }
    if (filters.allFilters.minRating > 0) {
      toReturn = toReturn.filter(
        (product) => product.rating >= filters.allFilters.minRating
      );
    }
    if (filters.titleQuery.length) {
      const regexForSearch = new RegExp(filters.titleQuery, "gi");
      toReturn = toReturn.filter((product) =>
        regexForSearch.test(product.name)
      );
    }
    if (
      !!Number(filters.allFilters.priceRange.min) &&
      !!Number(filters.allFilters.priceRange.max)
    ) {
      toReturn = toReturn.filter(
        (product) =>
          Number(filters.allFilters.priceRange.max) >= product.currentPrice &&
          product.currentPrice >= Number(filters.allFilters.priceRange.min)
      );
    }
    switch (filters.sortBy) {
      case `price--high-to-low`:
        toReturn = toReturn.sort((productA, productB) => {
          if (productB.currentPrice > productA.currentPrice) {
            return 1;
          } else if (productA.currentPrice > productB.currentPrice) {
            return -1;
          }
          return 0;
        });
        break;
      case `price--low-to-high`:
        toReturn = toReturn.sort((productA, productB) => {
          if (productA.currentPrice > productB.currentPrice) {
            return 1;
          } else if (productB.currentPrice > productA.currentPrice) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case `highest-rated-first`:
        toReturn = toReturn.sort((productA, productB) => {
          if (productB.rating > productA.rating) {
            return 1;
          } else if (productA.rating > productB.rating) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      default:
        break;
    }
    setInViewProducts(toReturn);
  }
  return { inViewProducts };
}
