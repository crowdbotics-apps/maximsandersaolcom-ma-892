import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';


class Input extends PureComponent {
  input = React.createRef();

  render() {
    const {
      value,
      error,
      baseColor,
      errorColor,
      placeholder,
      multiline,
      titleFontSize,
      inputStyle, // @todo -> Rename to style!
      titleTextStyle,
      labelTextStyle,
      onChangeText,
      tintColor,
      ...rest
    } = this.props;

    return (
      <TextField
        {...rest}
        ref={this.input}
        placeholder="" //! @todo! -> Dont mix up placeholder and label
        label={placeholder} //! @todo!
        value={typeof value === 'string' ? value : ''}
        error={typeof error === 'string' ? error : ''}
        baseColor={baseColor}
        errorColor={errorColor}
        tintColor={!!error ? errorColor : baseColor}
        animationDuration={0}
        blurOnSubmit={multiline}
        titleFontSize={titleFontSize}
        onChangeText={onChangeText} //! @todo! -> Fix the different prop name
        style={[{ fontSize: titleFontSize }, inputStyle]} //! @todo!
        titleTextStyle={[titleTextStyle]}
        labelTextStyle={[labelTextStyle]}
        inputContainerStyle={{
          borderBottomColor: tintColor,
          borderBottomWidth: 1,
        }}
      />
    );
  }
}

Input.defaultProps = {
  id: null,
  label: '',
  placeholder: '',
  required: false,
  requiredIndicator: true,
  disabled: false,
  editable: true,
  multiline: false,

  baseColor: "#BFBFBF",
  tintColor: "#E4E4E4",
  textColor: "#4A4A4A",
  errorColor: "#f00",
  placeholderTextColor: "silver",

  lineWidth: 1,
  activeLineWidth: 1,
  disabledLineWidth: 1,

  disabledLineType: 'solid',

  labelFontSize: 14,
  titleFontSize: 14,
  errorFontSize: 10,

  onChangeText: () => {}
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  requiredIndicator: PropTypes.bool,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,

  onChangeText: PropTypes.func,
};

export default Input;