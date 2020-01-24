import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
// Packages
import AppIntroSlider from '../../components/AppIntroSlider';
import i18n from '../../i18n/i18n';
import Routes from '../../Routes';
import { isIphoneX } from '../../utils/common';
import Fonts from '../../assets/fonts';

const logoImage = require('../../assets/logoSplashScreen.png');
const secondSlideImage = require('../../assets/second-slide-image.jpg');
const thirdSlideImage = require('../../assets/third-slide-image.png');
const foruthSlideImage = require('../../assets/fourth-slide-image.jpg');

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 0,
    backgroundColor: '#22bcb5',
    text: i18n.t('introScreen.login')
  },
  {
    key: 1,
    title: i18n.t('introScreen.secondSlideTitle'),
    text: i18n.t('introScreen.secondSlideText'),
    src: secondSlideImage,
  },
  {
    key: 2,
    title: i18n.t('introScreen.thirdSlideTitle'),
    text: i18n.t('introScreen.thirdSlideText'),
    src: thirdSlideImage,
  },
  {
    key: 3,
    title: i18n.t('introScreen.fourthSlideTitle'),
    text: i18n.t('introScreen.fourthSlideText'),
    src: foruthSlideImage,
  }
];

class IntroScreen extends React.Component {
  sliderRef = React.createRef();

  renderItem = ({ item }) => {
    switch (item.key) {
      case 0:
        return this.renderFirstSlide(item);
      case 2:
        return this.renderSpecificSlide(item);
      default: return this.renderSlide(item);
    }
  };

  renderSpecificSlide = item => (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.conteiner}>
        <View style={styles.imageWrapperWithColor}>
          <Image source={item.src} style={styles.imageSlider} />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.centralTextSlider}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View style={{ flex: 2 }} />
      </View>
    </SafeAreaView>
  );

  renderSlide = item => (
    <SafeAreaView style={styles.conteiner}>
      <View style={styles.conteiner}>
        <Image source={item.src} style={styles.imageSlider} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.centralTextSlider}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View style={{ flex: 2 }} />
      </View>
    </SafeAreaView>
  );

  renderFirstSlide = (item) => {
    const { navigation: { navigate } } = this.props;
    return (
      <View style={styles.conteiner}>
        <View style={styles.loginButtonWrapper}>
          <TouchableOpacity
            style={{
              marginTop: isIphoneX() ? 45 : 25,
              marginRight: 25
            }}
            onPress={() => navigate(Routes.LoginScreen)}
          >
            <Text style={styles.loginLabel}>{item.text}</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={{
                marginTop: isIphoneX() ? 45 : 25,
                marginRight: 25
              }}
              onPress={() => navigate(Routes.SurveyScreen)}
          >
            <Text style={styles.loginLabel}>Survey Test</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.logoContainer}>
          <Image
            source={logoImage}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonsContainer} />
      </View>
    );
  }

  renderButton = (label, isLast) => {
    const { navigation: { navigate } } = this.props;
    return (
      <TouchableOpacity
        style={styles.buttonActionWrapper}
        onPress={() => {
          if (isLast) {
            return navigate(Routes.RegisterScreen);
          }
          return this.sliderRef.current.goToSlide(1);
        }}
      >
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <AppIntroSlider
        ref={this.sliderRef}
        slides={slides}
        renderDoneButton={() => this.renderButton(i18n.t('introScreen.signUp'), true)}
        renderNextButton={() => this.renderButton(i18n.t('introScreen.getStarted'), false)}
        activeDotStyle={styles.activeDotStyle}
        renderItem={this.renderItem}
        dotStyle={styles.dotStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  logo: {
    width,
    height: 150,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  title: {
    fontSize: 40,
    textAlign: 'left',
    color: 'rgb(0, 85,248)',
    fontFamily: Fonts.HELVETICA_BOLD
  },
  titleWrapper: {
    flex: 2.5,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: Fonts.HELVETICA_MEDIUM,
    textAlign: 'center'
  },
  imageWrapperWithColor: {
    flex: 3,
    backgroundColor: 'rgb(217,217,217)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSlider: {
    width,
    resizeMode: 'contain',
    flex: 3,
  },
  centralTextSlider: {
    flex: 2.5,
    paddingHorizontal: 10
  },
  loginButtonWrapper: {
    flex: 1,
    alignItems: 'flex-end'
  },
  buttonActionWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: Fonts.HELVETICA_MEDIUM,
    fontSize: 15
  },
  loginLabel: {
    fontFamily: Fonts.HELVETICA_MEDIUM,
    fontSize: 15
  },
  activeDotStyle: {
    backgroundColor: 'rgb(47,115,177)'
  },
  dotStyle: {
    backgroundColor: 'rgb(213,213,213)'
  }
});

IntroScreen.defaultProps = {
  navigation: {
    navigate: () => {}
  },
};

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default IntroScreen;
