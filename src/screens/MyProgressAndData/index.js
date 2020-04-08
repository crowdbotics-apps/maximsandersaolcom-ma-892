import React, {useEffect, useState} from 'react';
import { Text, FlatList, StyleSheet, View, ScrollView } from 'react-native';
import * as profileActions from '../../redux/actions/profile'
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";


const MyProgressAndData = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState('');

    const getPrograms = async () => {
        try {
            await dispatch(profileActions.getProgressAndData())
        }catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getPrograms().then(() => setIsLoading(false));
    }, []);

    const progressData = useSelector(state => state.profile.progressData);
    //console.log('State Profile', progressData);
    const {meal, workout} = progressData && progressData;
    console.log('workout before transform ', workout)


    const mealsData = meal && Object.values(meal);

    const workoutData = workout && Object.values(workout);
    console.log('workout after transorm data ', workoutData)
     const calories = workoutData && Object.values(workoutData[1]);



    if (isLoading || !mealsData || !workoutData) {
        return <Loading/>
    }



    return (

            <ScrollView contentContainerStyle={{flex: 1, paddingHorizontal: 30, marginTop: 30}}>


                <View style={{marginBottom: 20}}>
                    <Text style={styles.mealText}>Weekly consumption</Text>

                    <View style={styles.contentWrapper}>
                        <View style={styles.classWrapper}>
                            <Text style={styles.proteinLabel}>{`${mealsData[0]} g`}</Text>
                            <Text style={styles.classLabel}>Protein</Text>
                        </View>
                        <View style={styles.classWrapper}>
                            <Text style={styles.carbsLabel}>{`${mealsData[1]} g`}</Text>
                            <Text style={styles.classLabel}>Carbs</Text>
                        </View>
                        <View style={styles.classWrapper}>
                            <Text style={styles.fatLabel}>{`${mealsData[2]} g`}</Text>
                            <Text style={styles.classLabel}>Fat</Text>
                        </View>
                        <View style={styles.classWrapper}>
                            <Text style={styles.proteinLabel}>{`${mealsData[3]} cal`}</Text>
                            <Text style={styles.classLabel}>Calories</Text>
                        </View>
                    </View>

                    <Text style={styles.mealText}>Burned</Text>
                    <View style={styles.contentWrapper}>
                        <View style={styles.classWrapper}>
                            <Text style={styles.carbsLabel}>{`${calories[0]} g`}</Text>
                            <Text style={styles.classLabel}>Carbs</Text>
                        </View>
                        <View style={styles.classWrapper}>
                            <Text style={styles.fatLabel}>{`${calories[1]} g`}</Text>
                            <Text style={styles.classLabel}>Carbs casual</Text>
                        </View>
                        <View style={styles.classWrapper}>
                            <Text style={styles.proteinLabel}>{`${calories[2]} g`}</Text>
                            <Text style={styles.classLabel}>Protein</Text>
                        </View>
                    </View>



                </View>

            </ScrollView>
    )
};

const styles = StyleSheet.create({
    mealText: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 10

    },
    contentWrapper: {
       // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 20
    },
    classLabel: {
        color: 'rgb(95,94,94);',
        fontSize: 16
    },
    classWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    proteinLabel: {
        color: 'rgb(68,161,248);',
        fontSize: 16
    },
    carbsLabel: {
        color: 'rgb(240,187,64);',
        fontSize: 16
    },
    fatLabel: {
        color: 'rgb(220,58,38);',
        fontSize: 16
    }
});

export default MyProgressAndData;
