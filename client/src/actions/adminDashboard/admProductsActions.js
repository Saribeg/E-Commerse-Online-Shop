import axios from "axios";
import uniqueRandom from "unique-random";
const rand = uniqueRandom(0, 999999);

export const GET_CATEGORY_NAME = "GET_CATEGORY_NAME";
export const GET_SUB_CATEGORY_NAME = "GET_SUB_CATEGORY_NAME";
export const GET_FURTHER_SUB_CATEGORY_NAME = "GET_FURTHER_SUB_CATEGORY_NAME";
export const SET_SUBCATEGORY_OPTIONS = "SET_SUBCATEGORY_OPTIONS";
export const SET_FURTHER_SUBCATEGORY_OPTIONS =
  "SET_FURTHER_SUBCATEGORY_OPTIONS";
export const GET_PRODUCT_MODEL_NAME = "GET_PRODUCT_MODEL_NAME";
export const GET_WITHDRAWN_STATUS = "GET_WITHDRAWN_STATUS";
export const GET_ACTIVE_STATUS = "GET_ACTIVE_STATUS";
export const GET_CURRENT_PRICE = "GET_CURRENT_PRICE";
export const GET_PREVIOUS_PRICE = "GET_PREVIOUS_PRICE";
export const UPDATE_PRODUCT_FEATURES = "UPDATE_PRODUCT_FEATURES";
export const SET_COLOR_OPTIONS = "SET_COLOR_OPTIONS";
export const SET_SIZE_OPTIONS = "SET_SIZE_OPTIONS";
export const RESET_MODAL_STATUS = "RESET_MODAL_STATUS";
export const RESET_PRODUCT_FORM = "RESET_PRODUCT_FORM";
export const SET_ERROR_MSG = "SET_ERROR_MSG";
export const GENERATE_NEW_ITEM_NO = "GENERATE_NEW_ITEM_NO";
export const COLOR_COLLECTION_UPDATE_MESSAGE =
  "COLOR_COLLECTION_UPDATE_MESSAGE";
export const SIZE_COLLECTION_UPDATE_MESSAGE = "SIZE_COLLECTION_UPDATE_MESSAGE";

export const FETCH_NEW_PRODUCT_REQUESTED = "FETCH_NEW_PRODUCT_REQUESTED";
export const FETCH_NEW_PRODUCT_SUCCEEDED = "FETCH_NEW_PRODUCT_SUCCEEDED";
export const FETCH_NEW_PRODUCT_FAILED = "FETCH_NEW_PRODUCT_FAILED";

export const FETCH_NEW_PRODUCT_PHOTOS_SUCCEEDED =
  "FETCH_NEW_PRODUCT_PHOTOS_SUCCEEDED";
export const FETCH_NEW_PRODUCT_PHOTOS_FAILED =
  "FETCH_NEW_PRODUCT_PHOTOS_FAILED";

//Handling category chose in Select
export const getCategory = (option, navMenuItems, validation) => dispatch => {
  dispatch({
    type: GET_CATEGORY_NAME,
    payload: option
  });

  dispatch({
    type: GET_SUB_CATEGORY_NAME,
    payload: ""
  });

  dispatch({
    type: GET_FURTHER_SUB_CATEGORY_NAME,
    payload: ""
  });

  //Creating sub-category options for select input, which should be relevent to chosen category
  let subCategoryOptions = navMenuItems
    .map((cat, i) => {
      if (cat.categoryName === option.value) {
        return cat.subCategoryList.map(subCat => {
          return {
            value: subCat.subCategoryName,
            label: subCat.subCategoryName
          };
        });
      }
      return null;
    })
    .filter(item => {
      return item !== null;
    });

  let result = subCategoryOptions[0];

  dispatch({
    type: SET_SUBCATEGORY_OPTIONS,
    payload: result
  });

  if (option.value) {
    validation.category = "";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling sub-gategory chose in Select
export const getSubCategory = (
  option,
  navMenuItems,
  category,
  validation
) => dispatch => {
  dispatch({
    type: GET_SUB_CATEGORY_NAME,
    payload: option
  });

  dispatch({
    type: GET_FURTHER_SUB_CATEGORY_NAME,
    payload: ""
  });

  //Creating sub-sub-category options for select input, which should be relevent to chosen category and sub-category
  let furtherSubCategoryOptions = navMenuItems
    .map(cat => {
      if (cat.categoryName === category.value) {
        return cat.subCategoryList
          .map(subCat => {
            if (subCat.subCategoryName === option.value) {
              return subCat.furtherSubCategoryList.map(fSubCat => {
                return {
                  value: fSubCat.furtherSubCategoryName,
                  label: fSubCat.furtherSubCategoryName
                };
              });
            }
            return undefined;
          })
          .filter(item => {
            return item !== null && item !== undefined;
          });
      }
      return null;
    })
    .filter(item => {
      return item !== null && item !== undefined;
    });

  let result = furtherSubCategoryOptions[0][0];

  dispatch({
    type: SET_FURTHER_SUBCATEGORY_OPTIONS,
    payload: result
  });

  if (option.value) {
    validation.subCategory = "";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling sub-sub-gategory chose in Select
export const getFurtherSubCategory = (option, validation) => dispatch => {
  dispatch({
    type: GET_FURTHER_SUB_CATEGORY_NAME,
    payload: option
  });

  if (option.value) {
    validation.furtherSubCategory = "";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling entering product model name in input
export const getProductModelName = (model, validation) => dispatch => {
  dispatch({
    type: GET_PRODUCT_MODEL_NAME,
    payload: model
  });

  if (model.length >= 5 && model.length <= 50) {
    validation.productModelName = "";
  } else {
    validation.productModelName =
      "Product model name length must be between 5 and 50 characters";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling filling product withdrawnStatus in checkbox
export const getwithdrawnStatus = status => dispatch => {
  dispatch({
    type: GET_WITHDRAWN_STATUS,
    payload: status
  });
};

//Handling filling product activeStatus in checkbox
export const getActiveStatus = status => dispatch => {
  dispatch({
    type: GET_ACTIVE_STATUS,
    payload: status
  });
};

//Handling entering product CurrentPrice in input
export const getCurrentPrice = (
  price,
  validation,
  previousPrice
) => dispatch => {
  dispatch({
    type: GET_CURRENT_PRICE,
    payload: Number(price)
  });

  if (price > 0) {
    validation.currentPrice = "";
  } else {
    validation.currentPrice =
      "Current-price field is required and should be > 0";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling entering product PreviousPrice in input
export const getPreviousPrice = (
  price,
  validation,
  currentPrice
) => dispatch => {
  dispatch({
    type: GET_PREVIOUS_PRICE,
    payload: Number(price)
  });

  if ((price > 0 && price > currentPrice) || price === 0) {
    validation.previousPrice = "";
  } else {
    validation.previousPrice =
      "Previous price-price field should be > current price";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Taking existing colors and sizes from DB to show in Select options for Colors/ Sizes
export const getProductFeatures = () => dispatch => {
  axios.all([axios.get("/filters/colors"), axios.get("/filters/sizes")]).then(
    axios.spread((colors, sizes) => {
      // Get colors and create options for Select
      let productColors = colors.data.map(color => {
        return {
          value: color.colorName,
          label: color.colorName
        };
      });

      // Sort color values by alphabet
      let colorNameOptions = productColors.sort((a, b) => {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        return 0;
      });

      // Get cssHexCodes for showing colors in interface (not only words)
      let colorStyles = colors.data.map(color => {
        return {
          cssHexCode: color.cssHexCode,
          colorName: color.colorName
        };
      });

      let productSizes = sizes.data.map(size => {
        return {
          value: size.value,
          label: size.value
        };
      });

      let sizeOptions = productSizes.sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

      dispatch({
        type: SET_COLOR_OPTIONS,
        colors: colorNameOptions,
        colorCollection: colorStyles
      });

      dispatch({
        type: SET_SIZE_OPTIONS,
        payload: sizeOptions
      });
    })
  );
};

//Handling actions, when user chose product color
export const handleProductColors = (
  colorOption,
  productFeatures,
  colorIndex,
  colorStyles,
  validation
) => dispatch => {
  let colorCssHexCode = colorStyles.filter(item => {
    return item.colorName === colorOption.value;
  })[0]["cssHexCode"];

  productFeatures[colorIndex].colorName = colorOption;
  productFeatures[colorIndex].color = colorCssHexCode;

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  if (!hasDublicates(productFeatures, "colorName", "value")) {
    validation.colorDublicate = "";
  } else if (hasDublicates(productFeatures, "colorName", "value")) {
    validation.colorDublicate =
      "You have color dublicates in product, colors must be unique";
  }

  updatedProductFeatures.forEach((color, i) => {
    if (color.colorName.value) {
      validation.productFeatures[i].colorName = "";
    }
  });

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling actions, when user add new color for product
export const addColor = (productFeatures, validation) => dispatch => {
  let newColor = {
    color: "#ffffff",
    colorName: "white",
    imageUrls: [],
    previewImages: [],
    filesRejected: false,
    sizes: [
      {
        size: "",
        quantity: 0
      }
    ]
  };

  productFeatures.push(newColor);

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  let newColorValidation = {
    colorName: "",
    previewImages: "",
    imageNamesDuplicate: "",
    sizes: [
      {
        size: "",
        quantity: ""
      }
    ],
    sizeDublicate: ""
  };

  validation.productFeatures.push(newColorValidation);

  let newValidation = JSON.parse(JSON.stringify(validation));

  dispatch({
    type: SET_ERROR_MSG,
    payload: newValidation
  });
};

// Handling actions, when user add images to our Dropzone
export const getImages = (
  newImages,
  productFeatures,
  colorIndex,
  validation
) => dispatch => {
  // Information about files to show them in preview in our Dropzone component
  let incomingImages = newImages.map(img => {
    return {
      lastModified: img.lastModified,
      lastModifiedDate: img.lastModifiedDate,
      name: img.name,
      preview: img.preview,
      size: img.size,
      type: img.type,
      webkitRelativePath: img.webkitRelativePath
    };
  });

  // Saving files (blob-objects) in urls to fill our redux store with them, because it is not possible to store file-objects (blob) in store? only plain objects.
  // Then we could be able to convert them to files again for sending to our server when submit form
  const blobUrls = newImages.map(img => {
    return {
      blobUrl: window.URL.createObjectURL(img),
      fileName: img.name,
      mimeType: img.type
    };
  });

  let imgs = productFeatures[colorIndex].previewImages.concat(incomingImages);
  productFeatures[colorIndex].previewImages = imgs; // We save images for preview in productFeatures.previewImages
  productFeatures[colorIndex].filesRejected = false;
  productFeatures[colorIndex].blobUrls = blobUrls; // We urls (links) that will be available files in productFeatures.previewImages
  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures)); // Deep object copy

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  updatedProductFeatures.forEach((color, i) => {
    if (color.previewImages.length > 0) {
      validation.productFeatures[i].previewImages = "";
    }

    if (!hasDublicates(color.previewImages, null, "name")) {
      validation.productFeatures[i].imageNamesDuplicate = "";
    } else if (hasDublicates(color.previewImages, null, "name")) {
      validation.productFeatures[i].imageNamesDuplicate =
        "You have duplicates in your image names, must be unique";
    }
  });

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling actions, when files, added by user into Dropzone, are rejected because of unacceptable file-size or format
export const onFilesRejected = (productFeatures, colorIndex) => dispatch => {
  productFeatures[colorIndex].filesRejected = true;
  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });
};

//Handling actions, when user deletes image, added in Dropzone
export const deleteDropzoneImage = (
  e,
  productFeatures,
  colorIndex,
  validation
) => dispatch => {
  if (e.target.getAttribute("data-action") === "delete-image") {
    e.preventDefault();

    let index = +e.target.previousElementSibling.dataset.index;

    let newImages = productFeatures[colorIndex].previewImages.filter(
      (image, i) => {
        return i !== index;
      }
    );

    productFeatures[colorIndex].previewImages = newImages;

    let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

    dispatch({
      type: UPDATE_PRODUCT_FEATURES,
      payload: updatedProductFeatures
    });

    updatedProductFeatures.forEach((color, i) => {
      if (color.previewImages.length < 1) {
        validation.productFeatures[i].previewImages =
          "You must upload at least 1 image for adding product";
      } else {
        validation.productFeatures[i].previewImages = "";
      }

      if (!hasDublicates(color.previewImages, null, "name")) {
        validation.productFeatures[i].imageNamesDuplicate = "";
      } else if (hasDublicates(color.previewImages, null, "name")) {
        validation.productFeatures[i].imageNamesDuplicate =
          "You have duplicates in your image names, must be unique";
      }
    });

    dispatch({
      type: SET_ERROR_MSG,
      payload: validation
    });
  }
};

//Handling actions, when user deletes added color to product
export const deleteColor = (
  productFeatures,
  colorIndex,
  validation
) => dispatch => {
  let updatedProductFeatures = productFeatures.filter((color, i) => {
    return i !== Number(colorIndex);
  });

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  let newValidationProductFeatures = validation.productFeatures.filter(
    (color, i) => {
      return i !== Number(colorIndex);
    }
  );

  validation.productFeatures = newValidationProductFeatures;

  if (!hasDublicates(updatedProductFeatures, "colorName", "value")) {
    validation.colorDublicate = "";
  } else if (hasDublicates(productFeatures, "colorName", "value")) {
    validation.colorDublicate =
      "You have color dublicates in product, colors must be unique";
  }

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

//Handling actions, when user chose product size
export const handleProductSizes = (
  sizeOption,
  productFeatures,
  colorIndex,
  sizeIndex,
  validation
) => dispatch => {
  productFeatures[colorIndex].sizes[sizeIndex].size = sizeOption;

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  updatedProductFeatures.forEach((color, i) => {
    if (!hasDublicates(color.sizes, "size", "value")) {
      validation.productFeatures[i].sizeDublicate = "";
    } else if (hasDublicates(color.sizes, "size", "value")) {
      validation.productFeatures[i].sizeDublicate =
        "Sizes has dublicate values, must be unique";
    }

    color.sizes.forEach((size, j) => {
      if (size.size.value) {
        validation.productFeatures[i].sizes[j].size = "";
      }
    });
  });

  let newValidation = JSON.parse(JSON.stringify(validation));

  dispatch({
    type: SET_ERROR_MSG,
    payload: newValidation
  });
};

//Handling actions, when user fills product quantity
export const handleProductQuantity = (
  quantuty,
  productFeatures,
  colorIndex,
  sizeIndex
) => dispatch => {
  productFeatures[colorIndex].sizes[sizeIndex].quantity = quantuty;

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });
};

//Handling actions, when user adds nes size for product
export const addSize = (
  productFeatures,
  colorIndex,
  validation
) => dispatch => {
  let newSize = {
    size: "",
    quantity: 0
  };

  productFeatures[colorIndex].sizes.push(newSize);

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  let newSizeValidation = {
    size: "",
    quantity: ""
  };

  validation.productFeatures[colorIndex].sizes.push(newSizeValidation);

  let newValidation = JSON.parse(JSON.stringify(validation));

  dispatch({
    type: SET_ERROR_MSG,
    payload: newValidation
  });
};

//Handling actions, when user deletes added size for product
export const deleteSize = (
  productFeatures,
  colorIndex,
  sizeIndex,
  validation
) => dispatch => {
  productFeatures.forEach((color, i) => {
    if (i === Number(colorIndex)) {
      color.sizes = color.sizes.filter((size, j) => {
        return j !== Number(sizeIndex);
      });
    }
  });

  let updatedProductFeatures = JSON.parse(JSON.stringify(productFeatures));

  dispatch({
    type: UPDATE_PRODUCT_FEATURES,
    payload: updatedProductFeatures
  });

  validation.productFeatures.forEach((color, i) => {
    if (i === Number(colorIndex)) {
      color.sizes = color.sizes.filter((size, j) => {
        return j !== Number(sizeIndex);
      });
    }
  });

  updatedProductFeatures.forEach((color, i) => {
    if (!hasDublicates(color.sizes, "size", "value")) {
      validation.productFeatures[i].sizeDublicate = "";
    } else if (hasDublicates(color.sizes, "size", "value")) {
      validation.productFeatures[i].sizeDublicate =
        "Sizes has dublicate values, must be unique";
    }
  });

  dispatch({
    type: SET_ERROR_MSG,
    payload: validation
  });
};

// Handling situations, when user undo reseting the form in warning modal window
export const resetModal = status => dispatch => {
  dispatch({
    type: RESET_MODAL_STATUS,
    payload: status
  });
};

// Handling situations, when user reset the form (delet all filled information, returning form to its initial state)
export const resetForm = state => dispatch => {
  let initialState = {
    itemNo: rand(),
    category: "",
    subCategory: "",
    furtherSubCategory: "",
    productModelName: "",
    subCategoryOptions: [],
    furtherSubCategoryOptions: [],
    withdrawnFromSale: false,
    active: true,
    currentPrice: 0,
    previousPrice: 0,
    colorOptions: state.colorOptions,
    sizeOptions: state.sizeOptions,
    colorStyles: state.colorStyles,
    productFeatures: [
      {
        color: "#ffffff",
        colorName: "white",
        imageUrls: [],
        previewImages: [],
        filesRejected: false,
        sizes: [
          {
            size: "",
            quantity: 0
          }
        ]
      }
    ],
    resetModalStatus: false,
    validation: {
      category: "",
      subCategory: "",
      furtherSubCategory: "",
      productModelName: "",
      currentPrice: "",
      previousPrice: "",
      colorDublicate: "",
      productFeatures: [
        {
          colorName: "",
          previewImages: "",
          imageNamesDuplicate: "",
          sizes: [
            {
              size: "",
              quantity: ""
            }
          ],
          sizeDublicate: ""
        }
      ]
    },
    fetchingNewProduct: false,
    productMessage: "",
    photosMessage: "",
    colorCollectionUpdateMessage: "",
    sizeCollectionUpdateMessage: ""
  };

  let newState = JSON.parse(JSON.stringify(initialState));

  dispatch({
    type: RESET_PRODUCT_FORM,
    payload: newState
  });
};

export const generateNewItemNo = () => dispatch => {
  dispatch({
    type: GENERATE_NEW_ITEM_NO
  });
};

// Function for cheking if one of the form fields is invalid (if invalid - function returns true)
// export const isInvalid = obj => {
//   for (let propertyName in obj) {
//     if (
//       typeof obj[propertyName] != "object" &&
//       obj[propertyName] !== null &&
//       !Array.isArray(obj[propertyName])
//     ) {
//       if (obj[propertyName]) {
//         console.log(obj[propertyName]);
//         return true;
//       }
//     } else {
//       console.log("Nested : ");
//       console.log(obj[propertyName]);
//       isInvalid(obj[propertyName]);
//     }

//     return false;
//   }
// };

//НУЖНА ПОМОЩЬ ПЕРЕПИСАТЬ ЭТУ ЖУТКУЮ ФУНКЦИЮ, ПРОБОВАЛ РЕКУРСИЮ, НО ЧТО-ТО НЕ ВЫХОДИТ, ЛОГИКУ ГДЕ-ТО ТЕРЯЮ (одну попытку выше оставил, остальные удалил)
const isInvalid = obj => {
  let error = false;

  for (let key in obj) {
    if (
      typeof obj[key] != "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      if (obj[key]) {
        error = true;
      }
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach(item => {
        for (let prop in item) {
          if (
            typeof item[prop] != "object" &&
            item[prop] !== null &&
            !Array.isArray(item[prop])
          ) {
            if (item[prop]) {
              error = true;
            }
          } else {
            item[prop].forEach(subItem => {
              for (let subProp in subItem) {
                if (subItem[subProp]) {
                  error = true;
                }
              }
            });
          }
        }
      });
    }
  }

  return error;
};

// Function for cheking if array of object with nested object has dublicate value (same sizes)
function hasDublicates(arrayOfObjects, propName, subPropName) {
  if (!propName) {
    let arrayOfProperties = arrayOfObjects.map(item => {
      return item[subPropName];
    });

    let isDublicate = arrayOfProperties.some((item, i, arr) => {
      return arr.indexOf(item) !== i;
    });

    return isDublicate;
  } else {
    let arrayOfProperties = arrayOfObjects.map(item => {
      return item[propName][subPropName];
    });
    let isDublicate = arrayOfProperties.some((item, i, arr) => {
      return arr.indexOf(item) !== i;
    });

    return isDublicate;
  }
}

// Validating all fields in form
export const validateForm = (state, validation, furtherSubCategoryOptions) => {
  if (!state.category) {
    validation.category = "Category field is required";
  }

  if (!state.subCategory) {
    validation.subCategory = "Sub-category field is required";
  }

  if (furtherSubCategoryOptions.length > 0 && !state.furtherSubCategory) {
    validation.furtherSubCategory = "Sub-sub-category field is required";
  }

  if (!state.productModelName) {
    validation.productModelName = "Product model name field is required";
  }

  if (
    state.productModelName &&
    (state.productModelName.length < 5 || state.productModelName.length > 50)
  ) {
    validation.productModelName =
      "Product model name length must be between 5 and 50 characters";
  }

  if (!state.currentPrice || state.currentPrice === 0) {
    validation.currentPrice =
      "Current-price field is required and should be > 0";
  }

  if (state.previousPrice > 0 && state.previousPrice < state.currentPrice) {
    validation.previousPrice =
      "Previous price-price field should be > current price";
  }

  if (hasDublicates(state.productFeatures, "colorName", "value")) {
    validation.colorDublicate =
      "You have color dublicates in product, colors must be unique";
  }

  state.productFeatures.forEach((color, i) => {
    if (!color.colorName.value) {
      validation.productFeatures[i].colorName = "Color field is required";
    }

    if (color.previewImages.length < 1) {
      validation.productFeatures[i].previewImages =
        "You must upload at least 1 image for adding product";
    }

    if (hasDublicates(color.sizes, "size", "value")) {
      validation.productFeatures[i].sizeDublicate =
        "Sizes has dublicate values, must be unique";
    }

    if (hasDublicates(color.previewImages, null, "name")) {
      validation.productFeatures[i].imageNamesDuplicate =
        "You have duplicates in your image names, must be unique";
    }

    color.sizes.forEach((size, j) => {
      if (!size.size.value) {
        validation.productFeatures[i].sizes[j].size = "Size field is required";
      }
    });
  });

  let newValidation = JSON.parse(JSON.stringify(validation));

  return newValidation;
};

// Function for cextracting files, that are available in redux-store by blob-url (we save them to redux store by executing function getImages)
const urltoFile = async (url, filename, mimeType) => {
  let file = await fetch(url)
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(buf) {
      return new File([buf], filename, { type: mimeType });
    });
  return file;
};

// Sending information about our new product and photos to server to process data and save new product to database
export const sendNewProductToServer = (
  state,
  validation,
  furtherSubCategoryOptions
) => dispatch => {
  let validationObject = validateForm(
    state,
    validation,
    furtherSubCategoryOptions
  );

  dispatch({
    type: SET_ERROR_MSG,
    payload: validationObject
  });

  // If the form is invalid - do not send product to server
  if (isInvalid(validationObject)) {
    return;
  } else {
    // If the form is valid - send product to DB
    dispatch({
      type: FETCH_NEW_PRODUCT_REQUESTED
    });

    let newProduct = {
      withdrawnFromSale: state.withdrawnFromSale,
      active: state.active,
      itemNo: state.itemNo,
      category: state.category.value,
      subCategory: state.subCategory.value,
      furtherSubCategory: state.furtherSubCategory.value,
      model: state.productModelName,
      currentPrice: Number(state.currentPrice),
      previousPrice: Number(state.previousPrice),
      productFeatures: state.productFeatures
    };

    axios
      .post("/products/admin-panel/add-products", newProduct)
      .then(async response => {
        dispatch({
          type: FETCH_NEW_PRODUCT_SUCCEEDED,
          payload: response.data.message
        });

        // If our product object are successfully saved in DB, we receive response.data.success = true and can save photos to DB
        if (response.data.success) {
          // Creating statis part of image urls (this part are the same for every image that belong to product)
          let imageUrlStaticPart = `./client/build/img/products/${
            state.furtherSubCategory.value
              ? state.category.value +
                "/" +
                state.subCategory.value +
                "/" +
                state.furtherSubCategory.value
              : state.subCategory.value
              ? state.category.value + "/" + state.subCategory.value
              : state.category.value
          }/${state.itemNo}`;

          // Iterating or productFeatures in "for of" loop to use conveniently async - await functions, because in for / forEach loop it is hard to handle async - await
          for (let color of state.productFeatures) {
            const formData = new FormData();

            for (let file of color.blobUrls) {
              //Taking every blob-url, creating new files with function "urltoFile" that has been declared above, writing file to variable "blobFile" using async-await
              let blobFile = await urltoFile(
                file.blobUrl,
                file.fileName,
                file.mimeType
              );
              formData.append(`photos`, blobFile);
            }

            axios
              .post("/products/admin-panel/upload-product-images", formData, {
                // With files we are sending to server the path, where the files have to be saved (using multer)
                headers: {
                  path: `${imageUrlStaticPart}/${color.color.slice(1)}/`, // Static part of image url + colorCssHexCode without "#"
                  "content-type": "multipart/form-data"
                }
              })
              .then(response => {
                dispatch({
                  type: FETCH_NEW_PRODUCT_PHOTOS_SUCCEEDED,
                  payload: response.data.message
                });
              })
              .catch(error => {
                dispatch({
                  type: FETCH_NEW_PRODUCT_PHOTOS_FAILED,
                  payload:
                    "Something wrong with receiving photos at server. Please, check the path folder"
                });
              });

          }

          // Updating information about products in color collection
          let newProductColors = newProduct.productFeatures.map(color => {
            return {
              cssHexCode: color.color,
              colorName: color.colorName.value
            };
          });

          for (let color of newProductColors) {
            axios
              .post("/filters/colors/add-color", color)
              .then(updatedColor => {
                dispatch({
                  type: COLOR_COLLECTION_UPDATE_MESSAGE,
                  payload:
                    "Collor collection is successfully updated by information about new product"
                });
              })
              .catch(err => {
                dispatch({
                  type: COLOR_COLLECTION_UPDATE_MESSAGE,
                  payload:
                    "Something wrong with updating collor collection by information about new product"
                });
              });
          }

          // Updating information about products in size collection
          let nonUniqueSizes = [];
          newProduct.productFeatures.forEach(color => {
            color.sizes.forEach(size => {
              nonUniqueSizes.push(size.size.value);
            });
          });

          let newProductUniqueSizes = [...new Set(nonUniqueSizes)];

          for (let size of newProductUniqueSizes) {
            axios
              .post("/filters/sizes/add-size", { value: size })
              .then(updatedSize => {
                dispatch({
                  type: SIZE_COLLECTION_UPDATE_MESSAGE,
                  payload:
                    "Size collection is successfully updated by information about new product"
                });
              })
              .catch(err => {
                dispatch({
                  type: SIZE_COLLECTION_UPDATE_MESSAGE,
                  payload:
                    "Something wrong with updating size collection by information about new product"
                });
              });
          }
        } else {
          dispatch({
            type: FETCH_NEW_PRODUCT_PHOTOS_FAILED,
            payload: ""
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_NEW_PRODUCT_FAILED,
          payload: "Something wrong with saving product in DB. Check DB."
        });
      });
  }
};
