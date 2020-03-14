import {GET_PROFILE_INFO} from "../constants";

const initialState = {
    profile: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_INFO:
            return {
                ...state,
                //profile: action.userData,
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
