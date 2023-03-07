import * as React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, max, min, ...other } = props;
  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value >= min && value <= max) {
      return true;
    }
    return false;
  };
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
            formattedValue: values.formattedValue,
          },
        });
      }}
      isAllowed={withValueCap}
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputQuantity = React.forwardRef((props, ref) => {
  const { max, min } = props;
  return (
    <Box>
      <TextField
        {...props}
        label="Số lượng"
        name="numberformat"
        id="formatted-numberformat-input"
        fullWidth
        defaultValue={1}
        InputProps={{
          inputComponent: NumberFormatCustom,
          inputProps: {
            max: parseInt(max),
            min: parseInt(min),
          },
        }}
        ref={ref}
        variant="outlined"
      />
    </Box>
  );
});

export default InputQuantity;
