import axios from "axios";

export const SEND_NAV_REQUEST = "SEND_NAV_REQUEST"; // Preloader while executing asynchronous action
export const GET_NAV_MENU = "GET_NAV_MENU"; // Get Navigation menu items from server
export const CHANGE_SELECTED_ITEM_ACTIVE_STATUS =
  "CHANGE_SELECTED_ITEM_ACTIVE_STATUS";
export const ADD_NEW_CATEGORY = "ADD_NEW_CATEGORY";
export const ADD_NEW_SUB_CATEGORY = "ADD_NEW_SUB_CATEGORY";
export const ADD_NEW_FURTHER_SUB_CATEGORY = "ADD_NEW_FURTHER_SUB_CATEGORY";

export const FETCH_NAV_MENU_REQUESTED = "FETCH_NAV_MENU_REQUESTED";
export const FETCH_NAV_MENU_SUCCEEDED = "FETCH_NAV_MENU_SUCCEEDED";
export const FETCH_NAV_MENU_FAILED = "FETCH_NAV_MENU_FAILED";

// Get nav-menu items from mongoDB for initializing store
export const getAdmNavMenuItems = () => dispatch => {
  dispatch({
    type: SEND_NAV_REQUEST
  });

  axios.get("/nav-menu").then(navMenuItems => {
    let categoryList = navMenuItems.data[0].categoryList;
    let navMenuItemsArr = JSON.parse(JSON.stringify(categoryList));

    dispatch({
      type: GET_NAV_MENU,
      payload: navMenuItemsArr // The Array with the hierarchy Of Navigation menu categories (e.g. women) / subcategories (e.g. clothing) / further subcategories (e.g. pants, dresses)
    });
  });
};

// Change the parameter "active" for chosen nav-menu item in store
export const changeSelectedItemActiveStatus = (
  e,
  navMenuItems,
  id
) => dispatch => {
  navMenuItems.forEach(category => {
    if (category._id === id) {
      category.active = e.target.checked;
    } else {
      category.subCategoryList.forEach(subCategory => {
        if (subCategory._id === id) {
          subCategory.active = e.target.checked;
        } else {
          subCategory.furtherSubCategoryList.forEach(furtherSubCategory => {
            if (furtherSubCategory._id === id) {
              furtherSubCategory.active = e.target.checked;
            }
          });
        }
      });
    }
  });

  let newState = JSON.parse(JSON.stringify(navMenuItems));

  dispatch({
    type: CHANGE_SELECTED_ITEM_ACTIVE_STATUS,
    payload: newState
  });
};

// Add new category in nav-menu in store
export const addNewCategory = (categoryName, state) => dispatch => {
  if (categoryName.length < 3) {
    return null;
  }

  let newCategory = {
    active: true,
    subCategoryList: [],
    _id: String(Math.random() * (100000 - 1) + 1),
    categoryName: categoryName,
    categoryUrl: `/${categoryName}`
  };

  state.push(newCategory);

  let newState = JSON.parse(JSON.stringify(state));

  dispatch({
    type: ADD_NEW_CATEGORY,
    payload: newState
  });
};

// Add new sub-category in nav-menu in store
export const addNewSubCategory = (
  categoryName,
  subCategoryName,
  state
) => dispatch => {
  if (subCategoryName.length < 3) {
    return null;
  }

  let newSubCategory = {
    active: true,
    furtherSubCategoryList: [],
    _id: String(Math.random() * (100000 - 1) + 1),
    subCategoryName: subCategoryName,
    subCategoryUrl: `/${categoryName}/${subCategoryName}`
  };

  state.forEach(category => {
    if (category.categoryName === categoryName) {
      category.subCategoryList.push(newSubCategory);
    }
  });

  let newState = JSON.parse(JSON.stringify(state));

  dispatch({
    type: ADD_NEW_SUB_CATEGORY,
    payload: newState
  });
};

// Add new sub-sub-category in nav-menu in store
export const addNewFurtherSubCategory = (
  categoryName,
  subCategoryName,
  furtherSubCategoryName,
  state
) => dispatch => {
  if (furtherSubCategoryName.length < 3) {
    return null;
  }

  let newFurtherSubCategory = {
    active: true,
    _id: String(Math.random() * (100000 - 1) + 1),
    furtherSubCategoryName: furtherSubCategoryName,
    furtherSubCategoryUrl: `/${categoryName}/${subCategoryName}/${furtherSubCategoryName}`
  };

  state.forEach(category => {
    if (category.categoryName === categoryName) {
      category.subCategoryList.forEach(subCategory => {
        if (subCategory.subCategoryName === subCategoryName) {
          subCategory.furtherSubCategoryList.push(newFurtherSubCategory);
        }
      });
    }
  });

  let newState = JSON.parse(JSON.stringify(state));

  dispatch({
    type: ADD_NEW_FURTHER_SUB_CATEGORY,
    payload: newState
  });
};

// Save changes into mongoDB
export const saveUpdatedNavMenu = (
  state,
  callbackGetAdmNavMenuItems
) => dispatch => {
  dispatch({
    type: FETCH_NAV_MENU_REQUESTED
  });

  state.forEach(category => {
    delete category._id;
    category.subCategoryList.forEach(subCategory => {
      delete subCategory._id;
      subCategory.furtherSubCategoryList.forEach(furtherSubCategory => {
        delete furtherSubCategory._id;
      });
    });
  });

  let updatedMenu = JSON.parse(JSON.stringify(state));

  axios
    .post("/navigation-menu/add-list", { navigationMenuItems: updatedMenu })
    .then(response => {
      dispatch({
        type: FETCH_NAV_MENU_SUCCEEDED,
        payload: "Navigation Menu is successfully updated."
      });

      callbackGetAdmNavMenuItems();
    })
    .catch(err => {
      dispatch({
        type: FETCH_NAV_MENU_FAILED,
        payload: "An error occured. Please, check DB."
      });
    });
};
