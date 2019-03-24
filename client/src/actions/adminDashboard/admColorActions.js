import axios from "axios";

export const GET_NEW_COLOR_HEX = "GET_NEW_COLOR_HEX";
export const GET_NEW_COLOR_NAME = "GET_NEW_COLOR_NAME";
export const NEW_COLOR_MESSAGE = "NEW_COLOR_MESSAGE";
export const NEW_COLOR_MODAL_STATUS = "NEW_COLOR_MODAL_STATUS";

export const FETCH_NEW_COLOR_REQUESTED = "FETCH_NEW_COLOR_REQUESTED";
export const FETCH_NEW_COLOR_SUCCEEDED = "FETCH_NEW_COLOR_SUCCEEDED";
export const FETCH_NEW_COLOR_FAILED = "FETCH_NEW_COLOR_FAILED";

export const FETCH_EXISTING_COLOR_REQUESTED = "FETCH_EXISTING_COLOR_REQUESTED";
export const FETCH_EXISTING_COLOR_SUCCEEDED = "FETCH_EXISTING_COLOR_SUCCEEDED";
export const FETCH_EXISTING_COLOR_FAILED = "FETCH_EXISTING_COLOR_FAILED";

// Handle chosing color in react-color (color-picker)
export const getNewColorHex = colorPickerObject => dispatch => {
  dispatch({
    type: GET_NEW_COLOR_HEX,
    payload: colorPickerObject.hex
  });
};

// Handle entering color name into input
export const getNewColorName = colorName => dispatch => {
  dispatch({
    type: GET_NEW_COLOR_NAME,
    payload: colorName
  });
};

// Handling situations, when modal window about updating color in DB should be showed
export const handleNewColorModal = status => dispatch => {
  dispatch({
    type: NEW_COLOR_MODAL_STATUS,
    payload: status
  });
};

// Function for checking if the color is already exists in DB
export const checkNewColorInDb = (newColorName, newCssHexCode) => dispatch => {
  // Preloader
  dispatch({
    type: FETCH_NEW_COLOR_REQUESTED,
    payload: true
  });

  //Request to server
  axios
    .post("/filters/colors/check-color", {
      colorName: newColorName
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " "),
      cssHexCode: newCssHexCode
    })
    .then(colorInfo => {
      if (colorInfo.data.message) {
        // If color exists, show modal about existing color and update / cancel buttons
        dispatch({
          type: NEW_COLOR_MESSAGE,
          newColorMessage: colorInfo.data.message,
          existingColorObject: colorInfo.data.existingColor[0],
          isExistingColorsFetching: false
        });
      } else {
        // If color does not exists, show modal with save / cancel buttons
        dispatch({
          type: NEW_COLOR_MESSAGE,
          newColorMessage: colorInfo.data.message,
          existingColorObject: {},
          isExistingColorsFetching: false
        });
      }
    });
};

// Update in all products information about colors
export const updateColorsInAllProducts = (
  newColorName,
  newCssHexCode
) => dispatch => {
  let color = newColorName
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  let query = {
    colorName: color,
    cssHexCode: newCssHexCode
  };

  axios
    // Taking product objects as they must be transformed to (pre-update-version)
    .post("/colors/get-pre-updated-products", query)
    .then(preUpdatedProducts => {
      // Save new product versions to DB (with new colors), requesting to server in loop throwing every product, than must be updated
      for (let product of preUpdatedProducts.data) {
        axios
          .post("/colors/update-colors-in-products", { product })
          .then(updatedProducts => {
            console.log(updatedProducts);
          });
      }
    });
};

/*Handling situations, for:
1. If color does-not exist - save new color to DB.
2. If color exists - update existing color in DB and update all products (color in products), callback - callbackUpdateColorsInAllProducts().
*/
export const addOrUpdateColorInDb = (
  newColorName,
  newCssHexCode,
  callbackGetUpdatedColors,
  callbackGetProductFeatures,
  callbackUpdateColorsInAllProducts
) => dispatch => {
  // Preloader
  dispatch({
    type: FETCH_NEW_COLOR_REQUESTED,
    payload: true
  });

  // Save/update color
  axios
    .post("/filters/colors/add-color", {
      colorName: newColorName
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " "),
      cssHexCode: newCssHexCode
    })
    .then(color => {
      console.log(color);
      dispatch({
        type: FETCH_NEW_COLOR_SUCCEEDED,
        finalMessage: "Information in DB successfully updated",
        newColorObject: color.data,
        newColorModalStatus: false
      });

      callbackGetUpdatedColors(); // Update block with existing colors at interface
      callbackUpdateColorsInAllProducts(newColorName, newCssHexCode); // Update colors in products
      setTimeout(callbackGetProductFeatures, 2000);
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: FETCH_NEW_COLOR_FAILED,
        finalMessage: "An error occured, check DB",
        newColorModalStatus: false
      });
    });
};

// Get all existing colors to shoe them in interface
export const getExistingColorsFromDb = () => dispatch => {
  dispatch({
    type: FETCH_EXISTING_COLOR_REQUESTED
  });

  axios.get("/filters/colors").then(colors => {
    let colorNameOptions = colors.data.sort((a, b) => {
      if (a.colorName < b.colorName) {
        return -1;
      }
      if (a.colorName > b.colorName) {
        return 1;
      }
      return 0;
    });

    dispatch({
      type: FETCH_EXISTING_COLOR_SUCCEEDED,
      payload: colorNameOptions
    });
  });
};
