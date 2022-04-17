import { useRef } from "react";

import "./css/filterMenuStyle.css";
import { useFilter } from "../../contexts/filterContext";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";

export default function FilterMenu({ allBrands }) {
  const { filter, filterDispatch } = useFilter();
  const rangeSliderRef = useRef();
  return (
    <aside className="aside--filter-menu --verticle-flex --has-gap --has-padding --small-text">
      <div>
        <p>Filter by price</p>
        <div className="price-range-input-container --verticle-flex">
          <input
            className="input price-filter-input"
            type="text"
            name="price-filter"
            placeholder="min"
            defaultValue={filter.allFilters.priceRange.min || ""}
            onKeyUp={(e) =>
              filterDispatch({
                type: "FILTER_BY_PRICE",
                payload: {
                  minPrice: e.target.value || null,
                },
              })
            }
          />
          <input
            className="input price-filter-input"
            type="text"
            name="price-filter"
            placeholder="max"
            defaultValue={filter.allFilters.priceRange.max || ""}
            onKeyUp={(e) =>
              filterDispatch({
                type: "FILTER_BY_PRICE",
                payload: {
                  maxPrice: e.target.value || null,
                },
              })
            }
          />
        </div>
      </div>
      <div className="--verticle-flex">
        <label htmlFor="rating-filter-input">Filter by rating</label>
        <div className="inline-filter-container">
          <input
            className="input slider rating-filter-input"
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_RATING",
                payload: { minRating: e.target.value },
              })
            }
            type="range"
            name="rating-filter"
            id="rating-filter-input"
            min="0"
            max="5"
            ref={rangeSliderRef}
            defaultValue={filter.allFilters.minRating || 0}
          />
          <span className="current-range-value">
            {rangeSliderRef.current?.value || 0} +
          </span>
        </div>
      </div>
      <div>
        <p>Filter by brand</p>
        {allBrands.map((brand) => (
          <div className="inline-filter-container" key={`filter-menu-${brand}`}>
            <input
              className="input"
              type="checkbox"
              value={brand}
              id={`${brand.toLowerCase()}-brand-filter`}
              onChange={(e) =>
                filterDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: { filterBrand: e.target.value },
                })
              }
              defaultChecked={filter.allFilters.brand.includes(brand)}
            />
            <label htmlFor={`${brand.toLowerCase()}-brand-filter`}>
              {brand}
            </label>
          </div>
        ))}
      </div>
      <div>
        <p>Additional filters</p>
        <div>
          <div className="inline-filter-container">
            <input
              type="checkbox"
              id="in-stock-filter"
              onChange={() =>
                filterDispatch({ type: "TOGGLE_INCLUDE_OUT_OF_STOCK" })
              }
              defaultChecked={filter.allFilters.includeOutOfStock}
            />
            <label htmlFor="in-stock-filter">Include out of stock</label>
          </div>
          <div className="inline-filter-container">
            <input
              type="checkbox"
              id="flash-delivery-filter"
              onChange={() =>
                filterDispatch({ type: "TOGGLE_SHOW_FLASH_DELIVERY_ONLY" })
              }
              defaultChecked={filter.allFilters.showFlashDeliveryOnly}
            />
            <label htmlFor="flash-delivery-filter">Flash delivery only</label>
          </div>
        </div>
      </div>
      <div>
        <p>Sort by</p>
        {[
          "relevance",
          "price--low-to-high",
          "price--high-to-low",
          "highest-rated-first",
        ].map((sortingProp) => (
          <div className="inline-filter-container">
            <input
              type="radio"
              name="sort-by"
              id={sortingProp}
              value={sortingProp}
              onClick={(e) =>
                filterDispatch({
                  type: `SORT_BY`,
                  payload: { sortBy: e.target.value },
                })
              }
              defaultChecked={filter.sortBy === sortingProp}
            />
            <label htmlFor={sortingProp}>
              {capitalizeFirstLetter(sortingProp).replaceAll("-", " ")}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
}
