import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import SurveyQuestionText from "./SurveyQuestionText";
import SurveyQuestionDescription from "./SurveyQuestionDescription";
import SurveyQuestionOption from "./SurveyQuestionOption";


const Question = ({questions, singleQuestion, currentQuestion, nextQuestion, disabled}) => {

    const {type, question, description, options} = singleQuestion;
console.log(options);

    return (
        <>
        <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#d3d3d3' }}>
            <SurveyQuestionText>{question}</SurveyQuestionText>
            {description ? <SurveyQuestionDescription>{description}</SurveyQuestionDescription> : null}
        </View>

    {/*{options.map(option =>*/}
    {/*    <SurveyQuestionOption*/}
    {/*     onPress={() => {}}*/}
    {/*    >{option}</SurveyQuestionOption>*/}
    {/*)}*/}
</>
    )
};

export default Question;
