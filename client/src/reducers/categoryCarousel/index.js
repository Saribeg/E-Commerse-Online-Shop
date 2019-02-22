import {
    FETCH_CATEGORY_CAROUSEL_REQUESTED,
    FETCH_CATEGORY_CAROUSEL_SUCCEEDED
} from "../../actions/categoryCarousel";

const initialState = {
    categoriesList: [],
    isCategoriesFetching: false
};

function categoryCarousel(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORY_CAROUSEL_REQUESTED:
            return {
                ...state,
                isCategoriesFetching: true
            }
        case FETCH_CATEGORY_CAROUSEL_SUCCEEDED:
            return{
                ...state,
                categoriesList: action.payload,
                isCategoriesFetching: false
            }



        default:
            return{...state}
    }
}

export default categoryCarousel;