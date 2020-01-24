import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";


const SurveyButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3180BD', '#6EC2FA']}
                style={styles.linearGradient}>

                <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff'
    }
});

export default SurveyButton;
