import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet } from 'react-native';


const SurveyInput = (props) => {
    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, props.style, isFocus && {borderBottomColor: 'pink'}]}
                placeholder={props.placeholder}
                placeholderTextColor={''}
                autoCorrect={false}
                value={props.value}
                onChangeText={props.onChangeText}
                onFocus={() => setIsFocus(true)}

            />

            {props.value.length > 0 &&
                <View style={styles.placeholderWrap}>
                    <Text style>{props.placeholder}</Text>
                </View>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        //width: '100%'
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    placeholderWrap: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    placeholder: {

    }

});

export default SurveyInput;
