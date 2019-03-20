import axios from "axios";

export const FETCH_FILTER_REQUESTED = "FETCH_FILTER_REQUESTED";
export const FETCH_FILTER_SUCCEEDED = "FETCH_FILTER_SUCCEEDED";
export const FETCH_FILTER_FAILED = "FETCH_FILTER_FAILED";

export const FETCH_PRODUCT_REQUESTED = "FETCH_PRODUCT_REQUESTED";
export const FETCH_PRODUCT_SUCCEEDED = "FETCH_PRODUCT_SUCCEEDED";
export const FETCH_PRODUCT_FAILED = "FETCH_PRODUCT_FAILED";

export const SELECT_FILTERS = "SELECT_FILTERS";

export const SELECT_SIZE = "SELECT_SIZE";
export const SELECT_PRICE = "SELECT_PRICE";

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

      sizeOptions.unshift({
        value: "all sizes",
        label: "All sizes"
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
      let newProducts = JSON.parse(JSON.stringify(products.data));
      dispatch({
        type: FETCH_PRODUCT_SUCCEEDED,
        payload: newProducts
      });
    })
    .catch(err => console.log(err));
};

export const selectFilters = (currentFilters, newFilters) => dispatch => {
  if (newFilters.subCategory === undefined) {
    delete currentFilters.subCategory;
  }
  if (newFilters.furtherSubCategory === undefined) {
    delete currentFilters.furtherSubCategory;
  }
  if (newFilters.colorName === undefined) {
    delete currentFilters.colorName;
  }
  if (newFilters.size === undefined) {
    delete currentFilters.size;
  }

  // function filterObject(obj) {
  //   const ret = {};
  //   Object.keys(obj)
  //     .filter(key => obj[key] !== undefined)
  //     .forEach(key => (ret[key] = obj[key]));
  //   console.log(
  //     "ret ======================================================================="
  //   );
  //   console.log(ret);
  //   return ret;
  // }

  // filterObject(newFilters);

  let filters = Object.assign(currentFilters, newFilters);

  dispatch({
    type: SELECT_FILTERS,
    payload: filters
  });

  dispatch({
    type: FETCH_PRODUCT_REQUESTED
  });

  axios
    .post("/products/filtered-products", {
      category: filters.category,
      subCategory: filters.subCategory,
      furtherSubCategory: filters.furtherSubCategory,
      colorName: filters.colorName,
      size: filters.size,
      minPrice: filters.price.min,
      maxPrice: filters.price.max
    })
    .then(products => {
      let newProducts = JSON.parse(JSON.stringify(products.data));
      dispatch({
        type: FETCH_PRODUCT_SUCCEEDED,
        payload: newProducts
      });
    })
    .catch(err => console.log(err));
};

export const selectSize = size => dispatch => {
  dispatch({
    type: SELECT_SIZE,
    payload: size
  });
};

export const selectPrice = price => dispatch => {
  dispatch({
    type: SELECT_PRICE,
    payload: price
  });
};

export const countProductsQuantity = (
  products,
  propertyName,
  propertyValue
) => {
  return products.filter(product => {
    return product[propertyName] === propertyValue;
  }).length;
};
