import React, { useEffect, useState } from 'react';
import { FontAwesome as IconFA, Feather as Icon } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


interface Point {
    id: number,
    name: string,
    description: string,
    sharedby: string,
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    image: string
}

const Details = () => {

    const [point, setPoint] = useState<Point>({} as Point);
    const route = useRoute();
    const pointParamType = route.params as Point;

    useEffect(() => {
        setPoint(pointParamType);
        console.log(pointParamType);
    }, []);


    const navigation = useNavigation();
    function handleNavigateBack() {
        navigation.goBack();
    }

    if (!point) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#2A508F"></Icon>
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: point.image }}>

                </Image>

                <Text style={styles.pointName}>{point.name}</Text>

                <Text style={styles.pointItems}>Surf, Bodyboard</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Locate:</Text>
                    <Text style={styles.addressContent}>{point.city + " " + point.country}</Text>
                </View>

                 <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: point.latitude,
                            longitude: point.longitude,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,

                        }}>
                        <Marker
                            // onPress={handleNavigateToDetail}
                            style={styles.mapMarker}
                            coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                                
                            }}>
                            <View style={styles.mapMarkerContainer}>
                                <Image
                                    style={{ height: 40, width: 40 }}
                                    source={require('../../assets/marker.png')}></Image>
                                <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={() => { }}>
                    <IconFA name="whatsapp" size={20} color="#FFF" ></IconFA>
                    <Text style={styles.buttonText}>Share</Text>
                </RectButton>
            </View>
        </>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 90,
    },

    mapMarkerContainer: {
        width: 90,
        height: 90,
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },
});

export default Details;