import React, { useEffect, useRef, useMemo, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { gql, useSubscription } from '@apollo/client';
import MapView, { Marker, Region } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import _ from 'lodash';
import CloseButton from './CloseButton';

const { width, height } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
//Default Manhattan Address
const initLatLng: Region = {
  latitude: 40.809018,
  longitude: -73.934462,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * ASPECT_RATIO,
};

const Subscribe_Cars = gql`
  subscription {
    cars {
      id
      location {
        longitude
        latitude
      }
      distanceToDestination
    }
  }
`;
type Car = {
  id: string;
  location: { latitude: number; longitude: number };
  distanceToDestination: number;
};
const Images = {
  carIcon: require('./Car.png'),
};

type RiderPanelProps = {
  rider: Car;
};
const RiderPanel = ({ rider }: RiderPanelProps) => {
  return (
    <View style={styles.riderContainer}>
      <View style={styles.riderInfoTitleContent}>
        <Text style={styles.infoTitleTxt}>{'Car '}</Text>
        <Text style={styles.infoTitleTxt}>{`#${rider.id}`}</Text>
      </View>
      <View style={styles.riderInfoContent}>
        <Text style={styles.infoTxt}>{'Location: '}</Text>
        <Text
          style={styles.infoTxt}>{`${rider.location.latitude}, ${rider.location.longitude}`}</Text>
      </View>
      <View style={styles.riderInfoContent}>
        <Text style={styles.infoTxt}>{'Distance to Destination: '}</Text>
        <Text style={styles.infoTxt}>{`${rider.distanceToDestination}`}</Text>
      </View>
    </View>
  );
};

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription

  const panelEl = useRef<SlidingUpPanel>(null);

  useEffect(() => panelEl.current?.show());
  const [activeRiderId, setActiveRiderId] = useState<string | null>(null);
  const { data: subscribeData } = useSubscription(Subscribe_Cars);
  const riderListData: Car[] = useMemo(() => {
    if (!subscribeData) {
      return [];
    }
    return subscribeData?.cars || [];
  }, [subscribeData]);
  const activeRiderData = useMemo(() => {
    if (!activeRiderId) {
      return null;
    }
    return _.findLast(riderListData, (rider: Car) => rider.id === activeRiderId) || null;
  }, [riderListData, activeRiderId]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initLatLng}>
        {riderListData.map(rider => {
          return (
            <Marker
              key={rider.id}
              coordinate={rider.location}
              image={Images.carIcon}
              onPress={() => {
                setActiveRiderId(rider.id);
              }}
            />
          );
        })}
      </MapView>
      {/* For documentation on the MapView see https://github.com/react-native-maps/react-native-maps */}
      <SlidingUpPanel
        ref={panelEl}
        draggableRange={{ top: 200, bottom: 0 }}
        showBackdrop={false}
        allowDragging={false}>
        <View style={styles.panel}>
          <CloseButton
            onPress={() => {
              panelEl.current?.hide();
            }}
          />
          {activeRiderData ? <RiderPanel rider={activeRiderData} /> : null}
        </View>
      </SlidingUpPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingTop: 20,
  },
  riderContainer: {
    width: '100%',
  },

  riderInfoContent: {
    flexDirection: 'row',
    marginBottom: 5,
    flexGrow: 0,
  },
  riderInfoTitleContent: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  infoTitleTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoTxt: {
    fontSize: 15,
  },
});

export default CarMap;
