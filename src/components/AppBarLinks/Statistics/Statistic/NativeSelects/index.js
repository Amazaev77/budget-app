import React from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import PropTypes from "prop-types";

export default function NativeSelects({ month, handleChangeMonth }) {
  const options = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <div>
      <FormControl>
        <NativeSelect value={month} onChange={handleChangeMonth}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

NativeSelects.propTypes = {
  month: PropTypes.string.isRequired,
  handleChangeMonth: PropTypes.func.isRequired,
};
