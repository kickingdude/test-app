import React from 'react';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';


const GeoFindMe = () => {
    const [status, setStatus] = React.useState("");
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);

    const success = (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        

        setStatus("");
        setLatitude(latitude);
        setLongitude(longitude);
    }

    const error = () => {
        setStatus("Unable to retrieve your location");
    }

    React.useEffect(() => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            setStatus("Locating…");
            navigator.geolocation.getCurrentPosition(success, error);
            
        }
    }, []);
    const myList = {lat : latitude, long: longitude};
    const serializedList =JSON.stringify(myList);
    return (

        <View>
            <Text id="status">{status}</Text>
            <Button
                title="Show my location"
                onPress={() => Linking.openURL(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)}
            />
            <iframe src={'https://www.openstreetmap.org/#map=2/54.0/-26.0'} />
        </View>
    );
}
export default function App() {
    return (
        <View style={styles.container}>
            <GeoFindMe />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1, width: '100%',
    },
});