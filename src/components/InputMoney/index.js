import * as React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const MAX_VAL = 90000000;
const withValueLimit = ({ floatValue }) => floatValue <= MAX_VAL;

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

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
      isAllowed={withValueLimit}
      thousandSeparator
      isNumericString
      suffix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputMoney = React.forwardRef((props, ref) => {
  return (
    <Box>
      <TextField
        {...props}
        label="Giá mỗi vật phẩm"
        name="numberformat"
        id="formatted-numberformat-input"
        fullWidth
        placeholder="100-90,000,000"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        ref={ref}
        variant="outlined"
      />
    </Box>
  );
});

export default InputMoney;
