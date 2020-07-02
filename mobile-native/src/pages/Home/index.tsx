import React from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();

    function handleNavigateToPoints() {
        navigation.navigate('Points');
    }
    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            imageStyle={{ width: '100%', height: '100%' }}
            style={styles.container}>
                
            <View style={styles.main}>
                
                {/* <Image source={require('../../assets/logo.png')} /> */}
                <Text style={styles.title}>The best surf spots ever!</Text>
                <Text style={styles.description}>Map spots to Surf, Bodyboard, Kite and SUP.</Text>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text> 
                            <Icon name="arrow-right-circle" color="#FFF" size={24}></Icon>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Let's go</Text>
                </RectButton>
                
            </View>
        </ImageBackground>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0
        
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 400,
        marginTop: 64,
        paddingHorizontal: 8
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 400,
        lineHeight: 24,
        paddingHorizontal: 8

    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#2A508F',
        height: 50,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 2,
        marginHorizontal: 80,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontWeight: "bold",
        fontSize: 20,
    }
});

export default Home;