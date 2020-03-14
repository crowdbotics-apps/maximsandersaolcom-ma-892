import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { withNavigation } from 'react-navigation';
import Routes from "../../Routes";


const StartupScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            console.log('TOKEN INSIDE STARTUp ', userData)
            if (!userData) {
                props.navigation.navigate(Routes.IntroScreen);
                return;
            }

            // if (userData) {
            //     const transformedData = JSON.parse(userData);
            //     const { token } = transformedData;
            //
            //
            //     if (typeof token !== 'string') {
            //         props.navigation.navigate(Routes.IntroScreen);
            //         return;
            //     }
            // }

            props.navigation.navigate(Routes.ProfileScreen);
        };

        tryLogin();
    }, [dispatch]);


    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={'#3180BD'}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withNavigation(StartupScreen);

