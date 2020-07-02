import React, { useState, useEffect, ChangeEvent, Component, Fragment } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Content, Card, CardItem, Thumbnail, Left, Right, Button, Body, Image as ImageBase, Text as TextBase, Icon as IconBase, View as ViewBase } from 'native-base';

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

interface country {
    label: string
    latlng: number[]
}

const Points = () => {
    const fakeData = [];

    fakeData.push(
        {
            "id": 51,
            "name": "Saquarema",
            "description": "Saquarema é conhecida internacionalmente como o “Maracanã do Surf”, e suas ondas abrigam a etapa brasileira da WSL, recebendo os tops do CT todo ano",
            "sharedby": "DanieeelFR",
            "city": "Rio de Janeiro",
            "country": "Brazil",
            "latitude": -22.937263,
            "longitude": -42.4785217,
            "image": "https://www.freesurf.com.br/blog/wp-content/uploads/2012/10/praia-itauna-rj-e1350316390674.jpg"
        });
    //     "id": 61,
    //     "name": "Saquarema",
    //     "description": "Local 1description",
    //     "sharedby": "user1",
    //     "city": "Rio de Janeiro",
    //     "country": "Brazil",
    //     "latitude": -22.950773,
    //     "longitude": -42.682255,
    //     "image": "https://f0.pngfuel.com/png/652/789/waves-surf-logo-png-clip-art-thumbnail.png"
    // },
    // {
    //     "id": 71,
    //     "name": "Saquarema",
    //     "description": "Local 1description",
    //     "sharedby": "user1",
    //     "city": "Rio de Janeiro",
    //     "country": "Brazil",
    //     "latitude": -22.950773,
    //     "longitude": -42.682255,
    //     "image": "https://f0.pngfuel.com/png/652/789/waves-surf-logo-png-clip-art-thumbnail.png"
    // },
    // {
    //     "id": 81,
    //     "name": "Saquarema",
    //     "description": "Local 1description",
    //     "sharedby": "user1",
    //     "city": "Rio de Janeiro",
    //     "country": "Brazil",
    //     "latitude": -22.950773,
    //     "longitude": -42.682255,
    //     "image": "https://f0.pngfuel.com/png/652/789/waves-surf-logo-png-clip-art-thumbnail.png"
    // },
    // {
    //     "id": 91,
    //     "name": "Saquarema",
    //     "description": "Local 1description",
    //     "sharedby": "user1",
    //     "city": "Rio de Janeiro",
    //     "country": "Brazil",
    //     "latitude": -22.950773,
    //     "longitude": -42.682255,
    //     "image": "https://f0.pngfuel.com/png/652/789/waves-surf-logo-png-clip-art-thumbnail.png"
    // }
    // ];
    const [countries, setCountries] = useState<[]>([]);
    const [country, setCountry] = useState<country>([]);
    useEffect(() => {
        const countriesJson = require('../../assets/countries.json');
        const sortedCountries = countriesJson.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

        const values = sortedCountries.map(function (x) {
            return {
                label: x.name,
                value: x.latlng
            }
        });
        setCountries(values);
    }, []);


    function handleCountryChange(item : country) {
        setCountry(item);
    }

    const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(point: Point) {
        navigation.navigate('Details', point)
    }

    return (
        <>
            <ViewBase style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#2A508F"></Icon>
                </TouchableOpacity>

                {/* <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.description}>Find and add the spots to Surf, Bodyboard, SUP and Kite here.</Text> */}
                <ViewBase style={styles.filtersContainer}>
                    <DropDownPicker
                        items={countries}
                        defaultIndex={0}
                        dropDownStyle={{ marginTop: 2 }}
                        itemStyle={{ alignItems: 'center' }}
                        dropDownMaxHeight={300}
                        containerStyle={{ height: 50, paddingHorizontal: 0, width: '100%' }}
                        placeholder="Search by country"
                        onChangeItem={item => handleCountryChange(item)}
                    />

                </ViewBase>
                <ViewBase style={styles.itemsContainer}>
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} > */}
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#fff' }}
                            source={require('../../assets/bodyboard.png')}>
                        </Image>
                        <Text style={styles.itemTitle}>Bodyboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#fff' }}
                            source={require('../../assets/kite.png')}>
                        </Image>
                        <Text style={styles.itemTitle}>Kitesurf</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#fff' }}
                            source={require('../../assets/sup.png')}>
                        </Image>
                        <Text style={styles.itemTitle}>Stand-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => { }}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#fff' }}
                            source={require('../../assets/surf.png')}>
                        </Image>
                        <Text style={styles.itemTitle}>Surf</Text>
                    </TouchableOpacity>
                    {/* </ScrollView> */}
                </ViewBase>
           
                <Content style={styles.contentCards}>
                    {fakeData
                        .filter(x => x.country.includes(country.label) || !country.label)
                        .map(x => (
                            <Card style={styles.card} key={x.id} onTouchEnd={() => handleNavigateToDetail(x)} >
                                <CardItem>
                                    <Left>
                                        <Thumbnail
                                            style={{width: 80, height: 80, borderRadius: 80/ 2}}  
                                            source={{uri: x.image}} />
                                        
                                        <Body>
                                            <TextBase style={styles.titleCard}>{x.name}</TextBase>
                                            <TextBase style={styles.descriptionTitleCard} note>{x.latitude + "  " + x.longitude}</TextBase>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    {/* <TextBase>{x.name}</TextBase> */}
                                    <TextBase style={styles.descriptionCard} note>{x.description}</TextBase>
                                </CardItem>
                                <CardItem style={styles.card}>
                                    <Left>
                                        <Button transparent>
                                            <IconBase active name="thumbs-up" />
                                            {/* <Text>{blog.likes}</Text> */}
                                        </Button>
                                        <Button transparent>
                                            <IconBase active name="chatbubbles" />
                                            {/* <Text>{blog.comments}</Text> */}

                                        </Button>
                                    </Left>
                                    <Body>
                                        <TextBase style={styles.sharedByCard} note>{"Shared by: " + x.sharedby}</TextBase>
                                    </Body>

                                </CardItem>
                            </Card>))}
                </Content>
            </ViewBase>



        </>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
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

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 0,
    },

    item: {
        backgroundColor: '#2A508F',
        borderWidth: 2,
        borderColor: '#111111',
        height: 60,
        width: 80,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingTop: 5,
        paddingBottom: 16,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#2A508F',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
    },

    filtersContainer: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 2
    },

    contentCards: {
        marginTop: 8,
        marginBottom: 2,
    },

    headerCardImage: {
        width: 30,
        height: 30,
    },

    titleCard: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'left',
        fontSize: 18,
        color: '#2A508F',
        fontWeight: "bold",
    },

    descriptionTitleCard: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'left',
    },

    descriptionCard: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'justify',
        marginHorizontal: 8,
    },

    sharedByCard: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'left',
        fontSize: 12,
        marginTop: 12,
    },

    card: {
        marginVertical: 0

    }

});

export default Points;