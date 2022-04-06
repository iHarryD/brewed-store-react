import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  function filterHandler(state, action) {
    switch (action.type) {
      case `TOGGLE_INCLUDE_OUT_OF_STOCK`:
        return {
          ...state,
          allFilters: {
            ...state.allFilters,
            includeOutOfStock: !state.allFilters.includeOutOfStock,
          },
        };
      case `TOGGLE_SHOW_FLASH_DELIVERY_ONLY`:
        return {
          ...state,
          allFilters: {
            ...state.allFilters,
            showFlashDeliveryOnly: !state.allFilters.showFlashDeliveryOnly,
          },
        };
      case `FILTER_BY_BRAND`:
        return {
          ...state,
          allFilters: {
            ...state.allFilters,
            brand: state.allFilters.brand.includes(action.payload.filterBrand)
              ? state.allFilters.brand.filter(
                  (brand) => brand !== action.payload.filterBrand
                )
              : [...state.allFilters.brand, action.payload.filterBrand],
          },
        };
      case `FILTER_BY_PRICE`:
        return {
          ...state,
          allFilters: {
            ...state.allFilters,
            priceRange: {
              ...state.allFilters.priceRange,
              min:
                action.payload.minPrice || action.payload.minPrice === null
                  ? action.payload.minPrice
                  : state.allFilters.priceRange.min,
              max:
                action.payload.maxPrice || action.payload.maxPrice === null
                  ? action.payload.maxPrice
                  : state.allFilters.priceRange.max,
            },
          },
        };
      case `FILTER_BY_RATING`:
        return {
          ...state,
          allFilters: {
            ...state.allFilters,
            minRating: action.payload.minRating,
          },
        };
      case `SORT_BY`:
        return {
          ...state,
          sortBy: action.payload.sortBy,
        };
      default:
        return state;
    }
  }
  const [filter, filterDispatch] = useReducer(filterHandler, {
    allFilters: {
      includeOutOfStock: false,
      showFlashDeliveryOnly: false,
      minRating: 0,
      brand: [],
      priceRange: {
        min: null,
        max: null,
      },
    },
    sortBy: "relevance",
  });
  return (
    <FilterContext.Provider value={{ filter, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
