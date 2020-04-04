import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, Platform, FlatList } from 'react-native';
import Fonts from "../../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from '../../redux/actions/profile';
import Loading from "../../components/Loading";
import HorizontalSliderItem from "../../components/HorizontalSliderItem";
import { selectOneRecipe, addRemoveFavorites} from '../../redux/modules/recipesReducer'


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

    if(isLoading) {
        return <Loading/>
    }

    return (
        <SafeAreaView  style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%'}}>

            <View style={{marginTop: 40}}>
            <FlatList
                data={recipesList}
                keyExtractor={item => `${item.pk}`}
                renderItem={({ item, index }) =>
                    <HorizontalSliderItem
                        isLiked={true}
                        onClick={() => {
                            dispatch(selectOneRecipe(item))
                        }}
                        navigation={props.navigation}
                        item={item}
                        addToFavorites={() => {
                            dispatch(addRemoveFavorites(item.id))
                        }}
                    />
                }
                ListEmptyComponent={() =>
                    <View
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}
                    ><Text style={{width: '100%'}}>No favorites recipes yet</Text></View>}
                />
            </View>
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
