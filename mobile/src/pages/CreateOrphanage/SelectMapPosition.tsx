import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import hand from '../../images/hand.png';
import mapMarkerImg from '../../images/map-marker.png';

interface SelectedMapRouteParams {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
}

const SelectMapPosition: React.FC = () => {
  const route = useRoute();
  const params = route.params as SelectedMapRouteParams;
  const navigation = useNavigation();

  const [currentLocation] = useState({
    latitude: params.currentLocation.latitude,
    longitude: params.currentLocation.longitude,
  });

  const [positionSelected, setPositionSelected] = useState({
    latitude: 0,
    longitude: 0,
  });

  function handleNextStep(): void {
    navigation.navigate('OrphanageData', { position: positionSelected });
  }

  function handleSelectMapPosition(event: MapEvent): void {
    setPositionSelected(event.nativeEvent.coordinate); // Salva a latitude e longitude
  }

  return (
    <View style={styles.container}>
      {positionSelected.latitude !== 0 ? (
        <>
          <MapView
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            onPress={handleSelectMapPosition}
            style={styles.mapStyle}
          >
            <Marker
              // icon={handleImg}
              coordinate={{
                latitude: positionSelected.latitude,
                longitude: positionSelected.longitude,
              }}
            />
          </MapView>
        </>
      ) : (
        <>
          <View style={styles.containerWithoutSelecting}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.selectButton}
              onPress={() =>
                setPositionSelected({
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                })}
            >
              <Image source={hand} />
              <Text style={styles.textInstruction}>
                Toque no mapa para adicionar um orfanato
              </Text>
            </TouchableOpacity>

            <MapView
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
              onPress={handleSelectMapPosition}
              style={styles.mapStyle}
            >
              <Marker
                icon={mapMarkerImg}
                coordinate={{
                  latitude: positionSelected.latitude,
                  longitude: positionSelected.longitude,
                }}
              />
            </MapView>
          </View>
        </>
      )}

      {positionSelected.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  containerWithoutSelecting: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectButton: {
    position: 'relative',
    top: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#15B6D6',
    zIndex: 99,
  },

  mapStyle: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  image: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#004',
  },

  textInstruction: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    lineHeight: 34,
    color: '#FFFFFF',
    maxWidth: 203,
    textAlign: 'center',
    marginTop: 24,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default SelectMapPosition;
