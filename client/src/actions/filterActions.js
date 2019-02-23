import axios from "axios";

export const FETCH_FILTER_REQUESTED = "FETCH_FILTER_REQUESTED";
export const FETCH_FILTER_SUCCEEDED = "FETCH_FILTER_SUCCEEDED";
export const FETCH_FILTER_FAILED = "FETCH_FILTER_FAILED";

// export const getNavMenuItems = () => dispatch => {
//   dispatch({
//     type: SEND_NAV_REQUEST
//   });

// 	axios.all([
// 		axios.get('http://google.com'),
// 		axios.get('http://apple.com')
// 	])
// 	.then(axios.spread((googleRes, appleRes) => {
// 		// do something with both responses
// 	}));
// };
