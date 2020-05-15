import React, { Component } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Image
} from 'react-native';
import Routes from '../../Routes';

const defaultItemValue = {
  name: '',
  id: 0
};

const barcodeIcon = require('../../assets/barcode.png');

export default class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.renderFlatList = this.renderFlatList.bind(this);
    this.searchedItems = this.searchedItems.bind(this);
    this.renderItems = this.renderItems.bind(this);

    this.state = {
      item: {},
      listItems: [],
    };
  }

  renderFlatList = () => {
    const { resetValue, listProps, itemsContainerStyle } = this.props;
    const { listItems } = this.state;
    if (resetValue) {
      const flatListPorps = { ...listProps };
      const oldSupport = [
        { key: 'keyboardShouldPersistTaps', val: 'always' },
        { key: 'nestedScrollEnabled', val: false },
        { key: 'style', val: { ...itemsContainerStyle } },
        { key: 'data', val: listItems },
        { key: 'keyExtractor', val: (item, index) => index.toString() },
        {
          key: 'renderItem',
          val: ({ item, index }) => this.renderItems(item, index)
        }
      ];
      oldSupport.forEach((kv) => {
        if (!Object.keys(flatListPorps).includes(kv.key)) {
          flatListPorps[kv.key] = kv.val;
        }
        if (kv.key === 'style') {
          flatListPorps.style = kv.val;
        }
      });
      return <FlatList {...flatListPorps} />;
    }
    return null;
  };

  searchedItems = searchedText => {
    let setSort = this.props.setSort;
    if (!setSort && typeof setSort !== "function") {
      setSort = (item, searchedText) => {
        return item.food_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
      };
    }
    var ac = this.props.items.filter(item => {
      return setSort(item, searchedText);
    });
    let item = {
      id: -1,
      name: searchedText
    };
    this.setState({ listItems: ac, item });
    const { textInputProps: { onTextChange } } = this.props;
    if (onTextChange && typeof onTextChange === 'function') {
      onTextChange(searchedText);
    }
  };

  renderItems = (item, index) => {
    const {
      multi,
      selectedItems,
      itemStyle,
      onRemoveItem,
      onItemSelect,
      resetValue,
      itemTextStyle
    } = this.props;
    if (multi && selectedItems && selectedItems.length > 0) {
      return selectedItems.find(sitem => sitem.id === item.id) ? (
        <TouchableOpacity
          style={{ ...itemStyle, flex: 1, flexDirection: 'row' }}
        >
          <View
            style={{
              flex: 0.9,
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            <Text>{item.name}</Text>
          </View>
          <View
            style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-end' }}
          >
            <TouchableOpacity
              onPress={() => setTimeout(() => { onRemoveItem(item, index); }, 0)}
              style={{
                backgroundColor: '#f16d6b',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                borderRadius: 100,
                marginLeft: 10
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            this.setState({ item });
            setTimeout(() => {
              onItemSelect(item);
            }, 0);
          }}
          style={{ ...itemStyle, flex: 1, flexDirection: 'row' }}
        >
          <View
            style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{ ...itemStyle }}
        onPress={() => {
          this.setState({ item });
          Keyboard.dismiss();
          setTimeout(() => {
            onItemSelect(item);
            if (resetValue) {
              this.setState({ item: defaultItemValue });
              this.input.focus();
            }
          }, 0);
        }}
      >
        {selectedItems && selectedItems.length > 0 && selectedItems.find(x => x.id === item.id) ? (
          <Text style={{ ...itemTextStyle }}>{item.name}</Text>
        ) : (
          <Text style={{ ...itemTextStyle }}>{item.name}</Text>
        )}
      </TouchableOpacity>
    );
  };

  renderListType = () => this.renderFlatList();

  renderTextInput = () => {
    const {
      textInputProps,
      underlineColorAndroid,
      onFocus,
      items,
      onBlur,
      textInputStyle,
      placeholderTextColor,
      placeholder,
      searchStringState,
      navigation
    } = this.props;
    const { item } = this.state;
    const oldSupport = [
      {
        key: 'ref',
        val: (e) => {
          this.input = e;
          return this.input;
        }
      },
      {
        key: 'onTextChange',
        val: (text) => {
          this.searchedItems(text);
        }
      },
      { key: 'underlineColorAndroid', val: underlineColorAndroid },
      {
        key: 'onFocus',
        val: () => {
          // eslint-disable-next-line no-unused-expressions
          onFocus && onFocus();
        }
      },
      {
        key: 'onBlur',
        val: () => {
          // eslint-disable-next-line no-unused-expressions
          this.props.unsetActiveSearch && this.props.unsetActiveSearch()
          onBlur && onBlur();
        }
      },
      {
        key: 'value',
        val: searchStringState
      },
      {
        key: 'style',
        val: { ...textInputStyle }
      },
      {
        key: 'placeholderTextColor',
        val: placeholderTextColor
      },
      {
        key: 'placeholder',
        val: placeholder
      }
    ];
    oldSupport.forEach((kv) => {
      if (!Object.keys(textInputProps).includes(kv.key)) {
        if (kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps.onChangeText = kv.val;
        } else {
          textInputProps[kv.key] = kv.val;
        }
      } else {
        if (kv.key === 'onTextChange' || kv.key === 'onChangeText') {
          textInputProps.onChangeText = kv.val;
        }
      }
    });
    return (
      <View style={{ flexDirection: 'row' }}>
        <TextInput {...textInputProps} />
        <TouchableOpacity
          style={{ width: 35, height: 35, marginLeft: -40 }}
          onPress={() => {
            const prevScreen = navigation.getParam('prevScreen', false);
            navigation.navigate(Routes.BarCodeScreen, { logFood: true, prevScreen });
          }}
        >
          <Image style={{ width: 35, height: 35 }} source={barcodeIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  render = () => {
    const { containerStyle } = this.props;
    return (
      <View
        keyboardShouldPersist="always"
        style={{ ...containerStyle }}
      >
        {this.renderTextInput()}
        {this.renderListType()}
      </View>
    );
  };
}
