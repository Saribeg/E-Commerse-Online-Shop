import axios from "axios";

export const GET_NEW_SIZE_NAME = "GET_NEW_SIZE_NAME";

export const FETCH_NEW_SIZE_REQUESTED = "FETCH_NEW_SIZE_REQUESTED";
export const FETCH_NEW_SIZE_SUCCEEDED = "FETCH_NEW_SIZE_SUCCEEDED";
export const FETCH_NEW_SIZE_FAILED = "FETCH_NEW_SIZE_FAILED";

export const FETCH_EXISTING_SIZE_REQUESTED = "FETCH_EXISTING_SIZE_REQUESTED";
export const FETCH_EXISTING_SIZE_SUCCEEDED = "FETCH_EXISTING_SIZE_SUCCEEDED";
export const FETCH_EXISTING_SIZE_FAILED = "FETCH_EXISTING_SIZE_FAILED";

export const GET_NUPDATED_SIZE_NAME = "GET_NUPDATED_SIZE_NAME";

export const FETCH_UPDATING_SIZE_REQUESTED = "FETCH_UPDATING_SIZE_REQUESTED";
export const FETCH_UPDATING_SIZE_SUCCEEDED = "FETCH_UPDATING_SIZE_SUCCEEDED";
export const FETCH_UPDATING_SIZE_FAILED = "FETCH_UPDATING_SIZE_FAILED";

// New size input value
export const getNewSizeName = sizeName => dispatch => {
  dispatch({
    type: GET_NEW_SIZE_NAME,
    payload: sizeName
  });
};

//Save new size to DB
export const saveNewSizeInDb = sizeName => dispatch => {
  let newSize = sizeName.trim().replace(/\s\s+/g, " ");
  // Preloader
  dispatch({
    type: FETCH_NEW_SIZE_REQUESTED
  });

  axios
    .post("/filters/sizes/check-size", { newSize: newSize })
    .then(size => {
      // If new size already exists in DB
      if (size.data.message) {
        dispatch({
          type: FETCH_NEW_SIZE_FAILED,
          payload: `Size vith value "${
            size.data.existingSize.value
          }" is already exists`
        });
      } else {
        axios
          .post("/filters/sizes/add-size", { value: newSize })
          .then(size => {
            //New size added to DB
            dispatch({
              type: FETCH_NEW_SIZE_SUCCEEDED,
              payload: `Size vith value "${
                size.data.value
              }" is successfully added to DB`
            });
          })
          .catch(error => {
            dispatch({
              type: FETCH_NEW_SIZE_FAILED,
              payload: `An error is occured. Please, check DB.`
            });
          });
      }
    })
    .catch(error => {
      dispatch({
        type: FETCH_NEW_SIZE_FAILED,
        payload: `An error is occured. Please, check DB.`
      });
    });
};

// Get existing sizes from DB
export const getExistingSizes = () => dispatch => {
  dispatch({
    type: FETCH_EXISTING_SIZE_REQUESTED
  });

  axios.get("/filters/sizes").then(sizes => {
    let existingSizes = sizes.data.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });

    let updatingSizes = sizes.data
      .map(size => {
        return {
          _id: size._id,
          value: size.value
        };
      })
      .sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

    dispatch({
      type: FETCH_EXISTING_SIZE_SUCCEEDED,
      payload: existingSizes,
      updatingSizes: updatingSizes
    });
  });
};

// Updating size inputs
export const getUpdatedSize = (allSizes, sizeId, updatedSize) => dispatch => {
  let newSizes = allSizes.map(size => {
    if (size._id === sizeId) {
      size.value = updatedSize;
    }

    return size;
  });

  dispatch({
    type: GET_NUPDATED_SIZE_NAME,
    payload: newSizes
  });
};

// Update in all products information about sizes
export const updateSizesInAllProducts = (
  previousSizeName,
  newSizeValue
) => dispatch => {
  let newSize = newSizeValue.trim().replace(/\s\s+/g, " ");

  let query = {
    previousSizeName: previousSizeName,
    newSizeName: newSize
  };

  axios
    // Taking product objects as they must be transformed to (pre-update-version)
    .post("/sizes/get-pre-updated-products", query)
    .then(preUpdatedProducts => {
      // Save new product versions to DB (with new sizes), requesting to server in loop throwing every product, than must be updated
      for (let product of preUpdatedProducts.data) {
        axios
          .post("/sizes/update-sizes-in-products", { product })
          .then(updatedProducts => {})
          .catch(error => {
            dispatch({
              type: FETCH_UPDATING_SIZE_FAILED,
              payload: `An error is occured. Please, check DB.`
            });
          });
      }
    });
};

// Update size in DB
export const updateSizeInDb = (
  sizeId,
  newSizeValue,
  existingSizes,
  callbackGetExistingSizes,
  callbackUpdateSizesInAllProducts
) => dispatch => {
  let newSize = newSizeValue.trim().replace(/\s\s+/g, " ");

  let previousSizeName = existingSizes.filter(size => {
    return size._id === sizeId;
  })[0].value;

  // Preloader
  dispatch({
    type: FETCH_UPDATING_SIZE_REQUESTED,
    payload: newSizeValue
  });

  axios
    .post("/filters/sizes/check-size", { newSize: newSize })
    .then(size => {
      // If new size already exists in DB
      if (size.data.message) {
        dispatch({
          type: FETCH_UPDATING_SIZE_SUCCEEDED,
          payload: `Size vith value "${
            size.data.existingSize.value
          }" is already exists, enter another value`,
          updatedSizeValue: size.data.existingSize.value
        });
      } else {
        axios
          .post("/filters/sizes/update-size", {
            sizeId: sizeId,
            newSize: newSize
          })
          .then(size => {
            //Size updated in DB
            dispatch({
              type: FETCH_UPDATING_SIZE_SUCCEEDED,
              payload: `Size is successfully updated from value "${previousSizeName}" to value "${
                size.data.value
              }"`,
              updatedSizeValue: size.data.value
            });

            callbackUpdateSizesInAllProducts(previousSizeName, newSize);

            setTimeout(callbackGetExistingSizes, 4000);
          })
          .catch(error => {
            dispatch({
              type: FETCH_UPDATING_SIZE_FAILED,
              payload: `An error is occured. Please, check DB.`
            });
          });
      }
    })
    .catch(error => {
      dispatch({
        type: FETCH_UPDATING_SIZE_FAILED,
        payload: `An error is occured. Please, check DB.`
      });
    });
};
