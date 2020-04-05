import React, { useState, Fragment } from 'react';
import {
    View, Switch, ScrollView, Text, Image, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SurveyQuestionText from './SurveyQuestionText';
import SurveyQuestionDescription from './SurveyQuestionDescription';
import SurveyQuestionOption from './SurveyQuestionOption';
import SurveyInput from './SurveyInput';
import SurveyRow from './SurveyRow';
import SurveyTerms from './SurveyTerms';
import SurveyButton from './SurveyButton';
import SurveyGhostInput from "./SurveyGhostInput";
import Fonts from "../../assets/fonts";
import Arrow from "../../assets/survey-chevron-left.png";


const Question = ({
                      questions, singleQuestion, currentQuestion, nextQuestion, selectAnswer, userAnswer, isDisabled, setIsDisabled, getFirstName
                  }) => {
    const {
        id, type, question, description, options
    } = singleQuestion;
    console.log('Single question ', singleQuestion);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [termsAgree, setTermsAgree] = useState(false);

    const [birthday, setBirthday] = useState(new Date());
    const [formatBirthday, setFormatBirthday] = useState('');
    // const birthdayFormatted = birthday.toLocaleDateString();
    const [units, setUnits] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [mealsQty, setMealsQty] = useState('');

    const [answerOption, setAnswerOption] = useState('');
    const [isSelected, setIsSelected] = useState('');
    const [isPicker, setIsPicker] = useState(false);
    const [mealTimes, setMealTimes] = useState([]);
    const [valueTime, setValueTime] = useState(new Date());
    const [eatTime, setEatTime] = useState('');


    const handleAnswer = () => {
        if (type === 'name') {
            selectAnswer({ name: firstName, lastName }, id);
        }

        if (type === 'birthday') {
            selectAnswer(formatBirthday, id);
        }

        if (type === 'multiple') {
            selectAnswer(answerOption, id);

            if (id === 11) {
                const qty = answerOption.split(' ');
                setMealsQty(qty[0])
            }
        }

        if (type === 'units') {
            selectAnswer(answerOption, id);
            setUnits(answerOption);
        }

        if (type === 'height') {
            selectAnswer(height, id);
        }

        if (type === 'weight') {
            selectAnswer(weight, id);
        }

        if (type === 'eatTime') {
            selectAnswer(mealTimes, id);
        }

        nextQuestion();
    };


    const togglePicker = (value) => {
        setIsPicker(value);
    };


    const gregorianAge = (birthDate, ageAtDate) => {
        // convert birthDate to date object if already not
        if (Object.prototype.toString.call(birthDate) !== '[object Date]')
            birthDate = new Date(birthDate);

        // use today's date if ageAtDate is not provided
        if (typeof ageAtDate == "undefined")
            ageAtDate = new Date();

        // convert ageAtDate to date object if already not
        else if (Object.prototype.toString.call(ageAtDate) !== '[object Date]')
            ageAtDate = new Date(ageAtDate);

        // if conversion to date object fails return null
        if (ageAtDate == null || birthDate == null)
            return null;


        var _m = ageAtDate.getMonth() - birthDate.getMonth();

        // answer: ageAt year minus birth year less one (1) if month and day of
        // ageAt year is before month and day of birth year
        return (ageAtDate.getFullYear()) - birthDate.getFullYear()
            - ((_m < 0 || (_m === 0 && ageAtDate.getDate() < birthDate.getDate())) ? 1 : 0)
    }


    const setBirthdayData = (event, date) => {
        setBirthday(date);
        //setFormatBirthday(gregorianAge(date)); // set age
        setFormatBirthday(date.toLocaleDateString());
        setIsDisabled(false);
    };

    // Set Eat mealsTime
    const setTime = (event, time, index) => {
        const eatTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setValueTime(time);
        setEatTime(eatTime);

        setMealTimes(prevState => {
            if (prevState[index]) {
                prevState[index].id = index;
                prevState[index].mealTime = eatTime;

                return prevState;
            } else {
                return [...prevState, { id: index, mealTime: eatTime }]
            }
        });

        setIsDisabled(false);
    };


    let questionType;
    switch (type) {
        case 'name':
            questionType = (
                <>
                    <View style={{ marginBottom: 35 }}>
                        <SurveyInput
                            placeholder="First"
                            value={firstName}
                            onChangeText={(value) => {
                                setFirstName(value);
                                getFirstName(value);
                            }}
                        />
                        <SurveyInput
                            placeholder="Last"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <SurveyRow>
                        <View style={{ width: '40%' }}>
                            <Switch
                                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }, { translateX: 10 }] }}
                                value={termsAgree}
                                onValueChange={(value) => {
                                    setTermsAgree(value);
                                    setIsDisabled(false);
                                }}
                            />
                        </View>
                        <View style={{ width: '60%' }}>
                            <SurveyTerms/>
                        </View>
                    </SurveyRow>
                </>
            );
            break;

        case 'birthday':
            questionType = (
                <>
                    <SurveyGhostInput
                        placeholder="Birthday"
                        value={formatBirthday}
                        onPress={togglePicker}
                    />
                    {isPicker && (
                        <DateTimePicker
                            value={birthday}
                            display="default"
                            onChange={setBirthdayData}
                            //maximumDate={new Date()}
                            minimumDate={new Date(1940, 0, 1)}
                        />)
                    }
                </>
            );
            break;

        case 'units':
            questionType = options && options.map((answer, index) => (
                <SurveyQuestionOption
                    key={index}
                    onPress={() => {
                        setAnswerOption(answer.option);
                        setIsDisabled(false);
                    }}
                    description={answer.descritpion}
                    isSelected={answer.option === answerOption}
                >
                    {answer.option}
                </SurveyQuestionOption>
            ));
            break;

        case 'multiple':
            questionType = options && options.map((answer, index) => (
                <SurveyQuestionOption
                    key={index}
                    onPress={() => {
                        setAnswerOption(answer.option);
                        setIsDisabled(false);
                    }}
                    description={answer.descritpion}
                    isSelected={answer.option === answerOption}
                >
                    {answer.option}
                </SurveyQuestionOption>
            ));
            break;

        case 'height':
            questionType = (
                <SurveyInput
                    placeholder={units === 'Feet/Pounds' ? 'Feet' : 'Centimeters'}
                    value={height}
                    onChangeText={(value) => {
                        setHeight(value);
                        setIsDisabled(false);
                    }}
                    keyboardType="numeric"
                />
            );

            break;

        case 'weight':
            questionType = (
                <SurveyInput
                    placeholder={units === 'Feet/Pounds' ? 'Pounds' : 'Kilograms'}
                    value={weight}
                    onChangeText={(value) => {
                        setWeight(value);
                        setIsDisabled(false);
                    }}
                    keyboardType="numeric"
                />
            );
            break;

        case 'eatTime':
            let questionItems = [...Array(+mealsQty)].map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setIsSelected(index)}
                    >
                        <SurveyRow
                            style={{
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#d3d3d3'
                            }}
                        >
                            <Text
                                style={{ fontSize: 20, fontFamily: Fonts.HELVETICA_MEDIUM, fontWeight: 'bold' }}
                            >{`Meal ${index + 1}`}</Text>

                            {mealTimes[index] ? <Text style={{ fontSize: 20, fontFamily: Fonts.HELVETICA_MEDIUM, }}>{mealTimes[index].mealTime}</Text> :
                                <Image
                                    style={{ transform: [{ rotate: '-90deg' }], width: 30, height: 30 }}
                                    source={Arrow}
                                    resizeMode="contain"
                                />
                            }
                        </SurveyRow>
                        {isSelected === index
                        && (
                            <DateTimePicker
                                value={valueTime}
                                display="default"
                                onChange={(event, date) => {
                                    setTime(event, date, index);
                                }}
                                mode={'time'}
                            />
                        )}
                    </TouchableOpacity>
                )
            });

            questionType = (
                <View>
                    {questionItems}
                </View>
            );
            break;

        default:
            break;
    }


    return (
        <>
            <View style={{ flex: 6, justifyContent: 'center' }}>
                <ScrollView style={{ flex: 1 }}>
                    <SurveyQuestionText>{question}</SurveyQuestionText>
                    {description ? <SurveyQuestionDescription>{description}</SurveyQuestionDescription> : null}
                    {questionType}
                </ScrollView>
            </View>
            <SurveyButton
                onPress={handleAnswer}
                disabled={isDisabled}
            />
        </>
    );
};

export default Question;
