import { useState, useId } from "react";

import styles from "./ProductFilterForm.module.css";

const priceSortType = [
  {
    id: 1,
    value: "",
    name: "Select",
  },
  {
    id: 2,
    value: "highest",
    name: "High-Low",
  },
  {
    id: 3,
    value: "lowest",
    name: "Low-High",
  },
];

const type = [
  {
    id: 1,
    value: "",
    name: "All",
  },
  {
    id: 2,
    value: 1,
    name: "Featured",
  },
];

const sortType = [
  {
    id: 1,
    value: "latest",
    name: "Latest",
  },
  {
    id: 2,
    value: "oldest",
    name: "Oldest",
  },
  {
    id: 3,
    value: "a-z",
    name: "A-Z",
  },
  {
    id: 4,
    value: "z-a",
    name: "Z-A",
  },
  {
    id: 5,
    value: "highest-rated",
    name: "Highest Rated",
  },
];

const CouponFilterForm = (props) => {
  const { queries, setQueries, categories, sizes } = props;
  const uniqueId = useId();
  const [categoryList, setCategoryList] = useState([
    { id: "", name: "select" },
    ...categories,
  ]);

  const filterChangeHandler = (e) => {
    setQueries((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        page: 1,
      };
    });
  };

  const clearFiltersHandler = () => {
    setQueries({
      search: "",
      sort: "latest",
      featured: "",
      categoryId: "",
      sizeId: "",
      priceSort: "",
      page: 1,
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row gy-2">
          <div className="col-4">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              value={queries.search}
              onChange={filterChangeHandler}
              name="search"
              id="search"
              placeholder="Search"
              className="form-control"
            />
          </div>
          <div className="col-4">
            <label htmlFor="featured" className="form-label">
              Type
            </label>
            <select
              value={queries.featured}
              onChange={filterChangeHandler}
              name="featured"
              id="featured"
              className="form-select"
            >
              {type.map((option) => {
                return (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="sort" className="form-label">
              Sort
            </label>
            <select
              value={queries.sort}
              onChange={filterChangeHandler}
              name="sort"
              id="sort"
              className="form-select"
            >
              {sortType.map((option) => {
                return (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="priceSort" className="form-label">
              Price
            </label>
            <select
              value={queries.priceSort}
              onChange={filterChangeHandler}
              name="priceSort"
              id="priceSort"
              className="form-select"
            >
              {priceSortType.map((option) => {
                return (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="categoryId" className="form-label">
              Categories
            </label>
            <select
              value={queries.categoryId}
              onChange={filterChangeHandler}
              name="categoryId"
              id="categoryId"
              className="form-select"
            >
              {categoryList.map((option) => {
                return (
                  <option key={option.id || uniqueId} value={option.id}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="sizeId" className="form-label">
              Size
            </label>
            <select
              value={queries.sizeId}
              onChange={filterChangeHandler}
              name="sizeId"
              id="sizeId"
              className="form-select"
            >
              {sizes.map((option) => {
                return (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <button
              onClick={clearFiltersHandler}
              className={`btn btn-primary btn-sm w-100 ${styles.filterBtn}`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponFilterForm;
