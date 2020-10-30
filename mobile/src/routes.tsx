import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './pages/SplashScreen';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanagesDetails from './pages/OrphanagesDetails';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  const [isFirstLaunched, setIsFirstLaunched] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('firstLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('firstLaunched', 'true');
      } else {
        setIsFirstLaunched(value);
      }
    });
    AsyncStorage.removeItem('firstLaunched');
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f2f3f5',
          },
        }}
      >
        {!isFirstLaunched && (
          <Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: true,
              headerStyle: { elevation: 0, shadowColor: 'transparent' },
              title: '',
            }}
          />
        )}
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
          options={{
            headerShown: false,
          }}
        />

        <Screen
          name="OrphanagesDetails"
          component={OrphanagesDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />

        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
