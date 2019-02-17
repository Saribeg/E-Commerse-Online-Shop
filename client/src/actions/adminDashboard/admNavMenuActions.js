import axios from "axios";

export const SEND_NAV_REQUEST = "SEND_NAV_REQUEST"; // Preloader while executing asynchronous action
export const GET_NAV_MENU = "GET_NAV_MENU"; // Get Navigation menu items from server
export const CHANGE_SELECTED_ITEM_ACTIVE_STATUS =
  "CHANGE_SELECTED_ITEM_ACTIVE_STATUS";

export const getAdmNavMenuItems = () => dispatch => {
  dispatch({
    type: SEND_NAV_REQUEST
  });

  axios.get("/nav-menu").then(navMenuItems => {
    dispatch({
      type: GET_NAV_MENU,
      payload: navMenuItems.data[0].categoryList // The Array with the hierarchy Of Navigation menu categories (e.g. women) / subcategories (e.g. clothing) / further subcategories (e.g. pants, dresses)
    });
  });
};

// changeSelectedItemActiveStatusWrapper = (e, array, id) => {
// 	array.foreach(item => {
// 		if(item._id = id){
// 			item.active = e.target.checked;
// 		} else {
// 			if ()
// 		}
// 	})
// }

export const changeSelectedItemActiveStatus = (
  e,
  navMenuItems,
  id
) => dispatch => {
  navMenuItems.forEach(category => {
    if (category._id === id) {
      category.active = e.target.checked;
      // if (e.target.checked === false) {
      //   category.subCategoryList.forEach(subCategory => {
      //     subCategory.active = e.target.checked;
      //     subCategory.furtherSubCategoryList.forEach(furtherSubCategory => {
      //       furtherSubCategory.active = e.target.checked;
      //     });
      //   });
      // }
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

  dispatch({
    type: CHANGE_SELECTED_ITEM_ACTIVE_STATUS,
    payload: navMenuItems
  });
};
