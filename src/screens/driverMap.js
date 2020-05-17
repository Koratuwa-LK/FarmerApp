import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Modal, TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

var markers = []

const driverMap = (props,{navigation}) => {

    /* const [markercoordinates, setmarkercoordinates] = useState()
 */
    const mapregion = {
        latitude: /* 37.78 */ props.navigation.getParam('lat'),
        longitude: /* -122.43 */ props.navigation.getParam('lng'),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421 
    }

    /* useEffect(() => {
        setmarkercoordinates({
            lat: props.navigation.getParam('lat'),
            lng: props.navigation.getParam('lng')
        })
        
    }, [markercoordinates]) */

    let markercoordinates = {
        latitude: props.navigation.getParam('lat'),
        longitude: props.navigation.getParam('lng')
    }

/*     return (
        <MapView
        showsUserLocation={true}
        style={styles.map}
        region={mapregion}
        onPress={picklocationHandler}>
        {markercoordinates && ( <MapView.Marker title="your location" coordinate={markercoordinates} /> )}
            
        
        </MapView>
        ) */
    let lat = props.navigation.getParam('userloc').lat
    let lng = props.navigation.getParam('userloc').lng
        
        

        return (
            <View style={styles.map}>
            
            <MapView
            showsUserLocation={true}
            style={styles.map}
            region={mapregion}
            >
            {markercoordinates && ( 
             
            <Marker title="marker" coordinate={markercoordinates} >
            {/* <View style={{height:35, width: 35}}>
             <Image source={require('../assets/delivery1.jpg')} style={{height: 35, width: 35}}/>
             </View> */}
            </Marker>
             )} 
            </MapView>
            
            <View>
                <Button mode="contained" onPress={() => {props.navigation.navigate('BookDriver', {lat: lat, lng: lng, name: props.navigation.getParam('name')})}} color="yellowgreen">book now</Button>
            </View>

            </View>
        
        )
}



const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    centeredView: {
      //  flex: 1,
        height: 219,
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'white'
    },
    markerinput: {
        padding: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 8
    },
    textinput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        height: 16,
        backgroundColor: 'rgba(200, 227, 149, 0.57)'
    },
    hdrbtn: {
        marginHorizontal: 20
    },
    btntext: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : '#94cc3f'
    }
})

export default driverMap;