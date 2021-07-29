import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import MapView from 'react-native-maps';

import SlidingUpPanel from 'rn-sliding-up-panel';
import CloseButton from './CloseButton';

type Car = {
  id: string;
  location: {latitude: number; longitude: number};
  distanceToDestination: number;
};

const CarMap = () => {
  // At the top of this component you should subscribe to updates from the server.
  // See https://www.apollographql.com/docs/react/data/subscriptions/#executing-a-subscription

  const panelEl = useRef<SlidingUpPanel>(null);

  useEffect(() => panelEl.current?.show());

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      {/* For documentation on the MapView see https://github.com/react-native-maps/react-native-maps */}
      <SlidingUpPanel
        ref={panelEl}
        draggableRange={{top: 200, bottom: 0}}
        showBackdrop={false}
        allowDragging={false}>
        <View style={styles.panel}>
          <CloseButton
            onPress={() => {
              panelEl.current?.hide();
            }}
          />
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
});

export default CarMap;
