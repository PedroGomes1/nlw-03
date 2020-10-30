import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import splashScreen from '../images/splash-screen.png';
import splashScreen2 from '../images/splash-screen2.png';

const Button: React.FC = ({ ...props }) => {
  return (
    <View style={styles.containerButton}>
      <TouchableOpacity style={styles.button} {...props}>
        <AntDesign name="arrowright" size={25} color="#15B6D6" />
      </TouchableOpacity>
    </View>
  );
};

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      containerStyles={styles.container}
      onDone={() => navigation.navigate('OrphanagesMap')}
      transitionAnimationDuration={200}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={splashScreen} style={{ marginBottom: 20 }} />,
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
          titleStyles: {
            fontSize: 48,
          },
        },
        {
          backgroundColor: '#fff',
          image: <Image source={splashScreen2} />,
          title: (
            <View style={styles.wrapper}>
              <Text style={styles.screenTwoTitle}>
                Escolha um orfanato no mapa e faça uma visita
              </Text>
            </View>
          ),
          subtitle: '',
        },
      ]}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      showSkip={false}
      bottomBarHighlight={Number(0)}
      NextButtonComponent={Button}
      DoneButtonComponent={Button}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 46,
  },

  wrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minWidth: '100%',
  },

  title: {
    lineHeight: 52,
    maxWidth: 220,
    textAlign: 'left',
    color: '#0089A5',
    fontFamily: 'Nunito_800ExtraBold',
  },

  screenTwoTitle: {
    color: '#0089A5',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    textAlign: 'right',
    maxWidth: 253,
  },

  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#5C8599',
    lineHeight: 30,
    textAlign: 'left',
    maxWidth: 235,
  },

  containerButton: {
    paddingHorizontal: 46,
  },

  button: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
