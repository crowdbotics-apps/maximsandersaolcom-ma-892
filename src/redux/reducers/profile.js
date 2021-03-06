import { GET_FAV_RECIPES, GET_PROFILE_INFO, GET_PROGRESS_DATA } from "../constants";

const initialState = {
    profileData: {},
    favoriteRecipes: [],
    progressData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_INFO:
            return {
                ...state,
                profileData: action.data,
            };

        case GET_FAV_RECIPES:
            return {
                ...state,
                favoriteRecipes: action.favoriteRecipes
            };

        case GET_PROGRESS_DATA:
            return {
                ...state,
                progressData: action.progressData
            };

        // case UPDATE_SETTINGS:
        //     return {
        //         ...state,
        //         user: {
        //             id: action.id,
        //             email: state.user.email,
        //             first_name: action.first_name,
        //             last_name: action.last_name,
        //             user_photo: action.user_photo
        //         }
        //     };

        default:
            return state;
    }
}
