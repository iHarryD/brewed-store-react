import { useRef } from "react";

import "./css/filterMenuStyle.css";
import { useFilter } from "../../contexts/filterContext";

export default function FilterMenu({ allBrands }) {
  const { filterDispatch } = useFilter();
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
            defaultValue={0}
            ref={rangeSliderRef}
          />
          <span className="current-range-value">
            {rangeSliderRef.current?.value || 0} +
          </span>
        </div>
      </div>
      <div>
        <p>Filter by brand</p>
        {allBrands.map((brand) => (
          <div className="inline-filter-container" key={brand}>
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
            />
            <label htmlFor="flash-delivery-filter">Flash delivery only</label>
          </div>
        </div>
      </div>
      <div>
        <p>Sort by</p>
        <div className="inline-filter-container">
          <input
            type="radio"
            name="sort-by"
            id="relevance"
            value="relevance"
            onClick={(e) =>
              filterDispatch({
                type: `SORT_BY`,
                payload: { sortBy: e.target.value },
              })
            }
            defaultChecked
          />
          <label htmlFor="relevance">Relevance</label>
        </div>
        <div className="inline-filter-container">
          <input
            type="radio"
            name="sort-by"
            id="price--low-to-high"
            value="price--low-to-high"
            onClick={(e) =>
              filterDispatch({
                type: `SORT_BY`,
                payload: { sortBy: e.target.value },
              })
            }
          />
          <label htmlFor="price--low-to-high">Price: Low to high</label>
        </div>
        <div className="inline-filter-container">
          <input
            type="radio"
            name="sort-by"
            id="price--high-to-low"
            value="price--high-to-low"
            onClick={(e) =>
              filterDispatch({
                type: `SORT_BY`,
                payload: { sortBy: e.target.value },
              })
            }
          />
          <label htmlFor="price--high-to-low">Price: High to low</label>
        </div>
        <div className="inline-filter-container">
          <input
            type="radio"
            name="sort-by"
            id="highest-rated-first"
            value="highest-rated-first"
            onClick={(e) =>
              filterDispatch({
                type: `SORT_BY`,
                payload: { sortBy: e.target.value },
              })
            }
          />
          <label htmlFor="highest-rated-first">Highest rated first</label>
        </div>
      </div>
    </aside>
  );
}
