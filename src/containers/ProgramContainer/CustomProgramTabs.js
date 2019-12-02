import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import i18n from '../../i18n/i18n';
import Fonts from '../../assets/fonts';
import ModalButton from '../../components/ModalButton';

const iconOverview = require('../../assets/icon_overview.png');
const iconDetails = require('../../assets/icon_details.png');
const iconDoneProgram = require('../../assets/icon_program_done.png');
const defaultImage = require('../../assets/logoSplashScreen.png');

const renderItem = (item, toggleModal) => (
  <TouchableOpacity
    style={item.done ? styles.itemTouchableDone : styles.itemTouchable}
    disabled={item.done}
    onPress={() => {
      toggleModal();
    }}
  >
    <View
      style={styles.itemWrapper}
    >
      <View style={styles.imageItemWrapper}>
        <Image
          source={item.exercise.pictures[0] ? { uri: item.exercise.pictures[0].image_url } : defaultImage}
          style={{ width: 100, height: 70 }}
          resizeMode="center"
        />
      </View>
      <View style={styles.textItemWrapper}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.textItem}
        >
          {item.exercise.name}
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#3180BD', '#6EC2FA']}
            style={styles.lineraGradientWrapper}
          >
            <Text style={styles.categoryText}>{item.exercise.exercise_type.name}</Text>
          </LinearGradient>
          <View style={styles.categoryWrapper}>
            <Text style={styles.categoryText}>
              Barbell
            </Text>
          </View>
        </View>
      </View>
      {
        item.done ? (
          <View
            style={styles.doneWrapperImage}
          >
            <Image
              source={iconDoneProgram}
              style={styles.doneIcon}
            />
          </View>
        ) : null
      }
    </View>
  </TouchableOpacity>
);

const emptyList = () => (
  <View>
    <Text>Empty List</Text>
  </View>
);

const renderModal = (isVisible, closeModal) => (
  <Modal
    isVisible={isVisible}
    animationOutTiming={1}
    onBackdropPress={() => {
      closeModal();
    }}
  >
    <View style={styles.modalContent}>
      <Text
        style={styles.titleModal}
      >
        {i18n.t('programScreen.finishModal.title')}
      </Text>
      <ModalButton
        onPress={() => {
          closeModal();
        }}
        label={i18n.t('programScreen.finishModal.buttons.yes')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
      <ModalButton
        onPress={() => {
          closeModal();
        }}
        label={i18n.t('programScreen.finishModal.buttons.no')}
        buttonStyle={styles.buttonStyleModal}
        labelStyle={styles.buttonModalLabelStyle}
      />
    </View>
  </Modal>
);

const CustomProgramTabs = ({
  overviewData = {},
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab(1)}
        >
          <View
            style={[
              styles.tabButtonsContainer,
              {
                borderBottomColor: activeTab === 1 ? 'rgb(1, 62, 245)' : 'rgb(255, 255, 255)',
                opacity: activeTab === 1 ? 1 : 0.3
              }
            ]}
          >
            <Image
              source={iconOverview}
              style={styles.iconTabs}
            />
            <Text style={styles.buttonText}>
              {i18n.t('programScreen.customTab.overview')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab(2)}
        >
          <View
            style={[
              styles.tabButtonsContainer,
              {
                borderBottomColor: activeTab === 2 ? 'rgb(1, 62, 245)' : 'rgb(255, 255, 255)',
                opacity: activeTab === 2 ? 1 : 0.3
              }
            ]}
          >
            <Image
              source={iconDetails}
              style={styles.iconTabs}
            />
            <Text style={styles.buttonText}>
              {i18n.t('programScreen.customTab.details')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      { activeTab === 1 ? (
        <SearchablePaginatedList
          style={{ flex: 1 }}
          ListEmptyComponent={emptyList}
          contentContainerStyle={styles.searchableContent}
          list={overviewData}
          fetchListAction={() => {}}
          renderItem={({ item }) => renderItem(item, () => setModalVisible(prevState => ({ modalVisible: !prevState.modalVisible })))}
          search=""
          filter=""
          numColumns={1}
        />
      ) : (
        <View
          style={{
            backgroundColor: 'rgb(242,242,242)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Some text here!</Text>
        </View>
      )}
      {
        modalVisible
          ? renderModal(modalVisible, () => setModalVisible(prevState => !prevState.modalVisible))
          : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  itemTouchable: {
    width: '100%',
    borderBottomColor: 'rgb(158,158,158);',
    borderBottomWidth: 1
  },
  itemTouchableDone: {
    width: '100%',
    opacity: 0.4,
    borderBottomColor: 'rgb(158,158,158);',
    borderBottomWidth: 1
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  imageItemWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  textItemWrapper: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70
  },
  textItem: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.HELVETICA_MEDIUM,
    marginTop: 15
  },
  iconTabs: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  searchableContent: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  doneWrapperImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneIcon: {
    width: 40,
    height: 40,
  },
  lineraGradientWrapper: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 15
  },
  categoryWrapper: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgb(146,146,146);'
  },
  categoryText: {
    color: 'white',
    fontFamily: Fonts.HELVETICA_BOLD
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonStyleModal: {
    width: '80%',
    height: 60,
    borderColor: 'rgb(230,230,230)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 15
  },
  buttonModalLabelStyle: {
    fontSize: 14,
    fontFamily: Fonts.HELVETICA_MEDIUM
  },
  titleModal: {
    fontSize: 20,
    fontFamily: Fonts.HELVETICA_BOLD,
    color: 'rgb(0,84,248)',
    marginBottom: 5
  },
});

export default CustomProgramTabs;
