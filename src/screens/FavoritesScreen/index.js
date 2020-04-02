import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, Platform } from 'react-native';
import Fonts from "../../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from '../../redux/actions/profile';
import Loading from "../../components/Loading";


const FavoritesScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const getFavorites = async () => {
        try {
          await dispatch(profileActions.getFavorites())
        } catch(err) {console.log(err)}
    };

    useEffect(() => {
        setIsLoading(true);
        getFavorites().then(() => setIsLoading(false))
    }, []);


    const recipesList = useSelector(state => state.profile.favoriteRecipes);
    console.log('FROM STATE RECEPIES',recipesList);

    if(isLoading) {
        return <Loading/>
    }


    return (
        <SafeAreaView>
        <Text>Favorites Screen</Text>
        </SafeAreaView>
    )
};


FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: (
            <Text
                style={{
                    fontFamily: Fonts.NOTE_NORMAL,
                    fontSize: 28,
                    textShadowColor: 'rgba(0, 0, 0, 0.50)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 4,
                    textAlignVertical: 'center'
                }}
            >
                Recipes
            </Text>
        ),
        headerStyle: Platform.select({
            ios: {
                borderBottomWidth: 0,
                shadowOpacity: 0,
            },
            android: {
                elevation: 0,
                backgroundColor: '#fff',
            }
        }),
    }
};

export default FavoritesScreen;
