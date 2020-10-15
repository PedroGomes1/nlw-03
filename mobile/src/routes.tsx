import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanagesDetails from './pages/OrphanagesDetails';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions = {{ //Também posso desabilitar o header em paginas específicas, só passar a propriedade options na minha Screen
          headerShown: false,
        }}
      >
        <Screen name="OrphanagesMap" component={OrphanagesMap}></Screen>
        <Screen name="OrphanagesDetails" component={OrphanagesDetails}></Screen>
      </Navigator>
    </NavigationContainer>
  )
}