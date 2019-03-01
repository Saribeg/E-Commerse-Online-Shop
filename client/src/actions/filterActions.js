import axios from "axios";

export const FETCH_FILTER_REQUESTED = "FETCH_FILTER_REQUESTED";
export const FETCH_FILTER_SUCCEEDED = "FETCH_FILTER_SUCCEEDED";
export const FETCH_FILTER_FAILED = "FETCH_FILTER_FAILED";

export const FETCH_PRODUCT_REQUESTED = "FETCH_PRODUCT_REQUESTED";
export const FETCH_PRODUCT_SUCCEEDED = "FETCH_PRODUCT_SUCCEEDED";
export const FETCH_PRODUCT_FAILED = "FETCH_PRODUCT_FAILED";

export const SELECT_FILTERS = "SELECT_FILTERS";

export const getFilterElems = () => dispatch => {
  dispatch({
    type: FETCH_FILTER_REQUESTED
  });

  axios.all([axios.get("/filters/colors"), axios.get("/filters/sizes")]).then(
    axios.spread((colorFilters, sizeFilters) => {
      let sizes = sizeFilters.data;
      let sizeOptions = sizes.map(size => {
        return {
          value: size.value,
          label: size.value
        };
      });

      dispatch({
        type: FETCH_FILTER_SUCCEEDED,
        colors: colorFilters.data,
        filters: sizeFilters.data,
        sizeOptions: sizeOptions
      });
    })
  );
};

export const getFilteredProducts = (
  category,
  subCategory,
  furtherSubCategory,
  colorName,
  size
) => dispatch => {
  dispatch({
    type: FETCH_PRODUCT_REQUESTED
  });

  axios
    .post("/products/filtered-products", {
      category: category,
      subCategory: subCategory,
      furtherSubCategory: furtherSubCategory,
      colorName: colorName,
      size: size
    })
    .then(products => {
      dispatch({
        type: FETCH_PRODUCT_SUCCEEDED,
        payload: products.data
      });
    })
    .catch(err => console.log(err));
};

export const selectFilters = (currentFilters, newFilters) => dispatch => {
  let filters = Object.assign(currentFilters, newFilters);

  dispatch({
    type: SELECT_FILTERS,
    payload: filters
  });

  axios
    .post("/products/filtered-products", {
      category: filters.category,
      subCategory: filters.subCategory,
      furtherSubCategory: filters.furtherSubCategory,
      colorName: filters.colorName,
      size: filters.size
    })
    .then(products => {
      dispatch({
        type: FETCH_PRODUCT_SUCCEEDED,
        payload: products.data
      });
    })
    .catch(err => console.log(err));

  // getFilteredProducts(
  //   filters.category,
  //   filters.subCategory,
  //   filters.furtherSubCategory,
  //   filters.colorName,
  //   filters.size
  // );
};
