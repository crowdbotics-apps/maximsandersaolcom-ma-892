import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FeedContainer from '../../containers/FeedContainer';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    }
});
const FeedScreen = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <FeedContainer/>
        </View>
    </SafeAreaView>
);
export default FeedScreen;
