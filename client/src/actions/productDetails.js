import axios from "axios";
import {FETCH_PRODUCT_DETAIL_REQUEST, 
			 FETCH_PRODUCT_DETAIL_SUCCEED, 
			 FETCH_PRODUCT_DETAIL_FAIL} from './types.js';

export const getProductDetails = (routeDetails) => dispatch => {
  dispatch({
    type: FETCH_PRODUCT_DETAIL_REQUEST
	});
	
	const {category, subCategory, furtherSubCategory, id} = routeDetails;

	axios.get(`/products/${category}/${subCategory}/${furtherSubCategory}/${id}`, {
		params: {
			category: category,
			subCategory: subCategory,
			furtherSubCategory: furtherSubCategory,
			id: id,					
		}
	}).then((result) =>{
		dispatch({
			type: FETCH_PRODUCT_DETAIL_SUCCEED,
			payload: result.data[0]
		})		
	})
};