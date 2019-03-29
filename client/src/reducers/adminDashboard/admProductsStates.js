import {
  GET_CATEGORY_NAME,
  GET_SUB_CATEGORY_NAME,
  GET_FURTHER_SUB_CATEGORY_NAME,
  SET_SUBCATEGORY_OPTIONS,
  SET_FURTHER_SUBCATEGORY_OPTIONS,
  GET_PRODUCT_MODEL_NAME,
  GET_WITHDRAWN_STATUS,
  GET_ACTIVE_STATUS,
  GET_CURRENT_PRICE,
  GET_PREVIOUS_PRICE,
  UPDATE_PRODUCT_FEATURES,
  SET_COLOR_OPTIONS,
  SET_SIZE_OPTIONS,
  RESET_MODAL_STATUS,
  RESET_PRODUCT_FORM,
  SET_ERROR_MSG,
  GENERATE_NEW_ITEM_NO,
  FETCH_NEW_PRODUCT_REQUESTED,
  FETCH_NEW_PRODUCT_SUCCEEDED,
  FETCH_NEW_PRODUCT_FAILED,
  FETCH_NEW_PRODUCT_PHOTOS_SUCCEEDED,
  FETCH_NEW_PRODUCT_PHOTOS_FAILED,
  COLOR_COLLECTION_UPDATE_MESSAGE,
  SIZE_COLLECTION_UPDATE_MESSAGE
} from "../../actions/adminDashboard/admProductsActions";
import uniqueRandom from "unique-random";
const rand = uniqueRandom(0, 999999);

const initialState = {
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
  colorOptions: [],
  sizeOptions: [],
  colorStyles: [],
  productFeatures: [
    {
      color: "#ffffff",
      colorName: "white",
      imageUrls: [],
      previewImages: [],
      blobUrls: [],
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

function admProducts(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_NAME:
      return {
        ...state,
        category: action.payload
      };
    case GET_SUB_CATEGORY_NAME:
      return {
        ...state,
        subCategory: action.payload
      };
    case GET_FURTHER_SUB_CATEGORY_NAME:
      return {
        ...state,
        furtherSubCategory: action.payload
      };
    case SET_SUBCATEGORY_OPTIONS:
      return {
        ...state,
        subCategoryOptions: action.payload
      };
    case SET_FURTHER_SUBCATEGORY_OPTIONS:
      return {
        ...state,
        furtherSubCategoryOptions: action.payload
      };
    case GET_PRODUCT_MODEL_NAME:
      return {
        ...state,
        productModelName: action.payload
      };
    case GET_WITHDRAWN_STATUS:
      return {
        ...state,
        withdrawnFromSale: action.payload
      };
    case GET_ACTIVE_STATUS:
      return {
        ...state,
        active: action.payload
      };
    case GET_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: action.payload
      };
    case GET_PREVIOUS_PRICE:
      return {
        ...state,
        previousPrice: action.payload
      };
    case SET_COLOR_OPTIONS:
      return {
        ...state,
        colorOptions: action.colors,
        colorStyles: action.colorCollection
      };
    case SET_SIZE_OPTIONS:
      return {
        ...state,
        sizeOptions: action.payload
      };
    case UPDATE_PRODUCT_FEATURES:
      return {
        ...state,
        productFeatures: action.payload
      };
    case RESET_MODAL_STATUS:
      return {
        ...state,
        resetModalStatus: action.payload
      };
    case RESET_PRODUCT_FORM:
      return {
        ...action.payload
      };
    case SET_ERROR_MSG:
      return {
        ...state,
        validation: action.payload
      };
    case GENERATE_NEW_ITEM_NO:
      return {
        ...state,
        itemNo: rand()
      };
    case FETCH_NEW_PRODUCT_REQUESTED:
      return {
        ...state,
        fetchingNewProduct: true
      };
    case FETCH_NEW_PRODUCT_SUCCEEDED:
      return {
        ...state,
        fetchingNewProduct: false,
        productMessage: action.payload
      };
    case FETCH_NEW_PRODUCT_FAILED:
      return {
        ...state,
        fetchingNewProduct: false,
        productMessage: action.payload
      };
    case FETCH_NEW_PRODUCT_PHOTOS_SUCCEEDED:
      return {
        ...state,
        fetchingNewProduct: false,
        photosMessage: action.payload
      };
    case FETCH_NEW_PRODUCT_PHOTOS_FAILED:
      return {
        ...state,
        fetchingNewProduct: false,
        photosMessage: action.payload
      };
    case COLOR_COLLECTION_UPDATE_MESSAGE:
      return {
        ...state,
        colorCollectionUpdateMessage: action.payload
      };
    case SIZE_COLLECTION_UPDATE_MESSAGE:
      return {
        ...state,
        sizeCollectionUpdateMessage: action.payload
      };
    default:
      return { ...state };
  }
}

export default admProducts;
