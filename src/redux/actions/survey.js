import AsyncStorage from "@react-native-community/async-storage";
import { API_URL } from "../constants";


export const getInitialSurveyForm = () => {
    return async dispatch => {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        try {
            const response = await fetch(`${API_URL}/form/get_initial_form/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const resData = await response.json();
            console.log('SURVEY RESP', response);
            console.log('SURVEY JSON RESP ', resData);


        } catch (err) {
            console.log(err)
        }

    }
};
