import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { addExpense } from "../../../../redux/features/expenses";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formStyles: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  textFieldStyles: {
    marginRight: theme.spacing(1),
    flexGrow: 3,
  },
  buttonStyles: {
    flexGrow: 2,
    maxHeight: "40px",
    maxWidth: "150px",
  },
  cancelIconStyles: {
    cursor: "pointer",
    alignSelf: "center",
    flexGrow: 1,
    marginLeft: "12px",
    maxHeight: "40px",
    "&:hover": {
      color: "#d10c52",
    },
  },
  formControl: {
    flexGrow: 2,
    transform: "translateY(-12px)",
    marginRight: "15px",
  },
}));

const ComponentTextFields = ({ handleShowTextFields, showTextFields }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("");
  const [comment, setComment] = useState("");

  const categories = useSelector((state) => state.categories.items);

  const handleAddExpense = () => {
    dispatch(addExpense(category, sum, comment, expenses.length, moment().format()));
    setCategory("");
    setSum("");
    setComment("");
    handleShowTextFields();
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeSum = (e) => {
    const value = e.target.value;

    if (!isNaN(parseInt(value))) {
      setSum(parseInt(value));
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  if (!showTextFields) {
    return null;
  }

  return (
    <form className={classes.formStyles}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Выберите категорию</InputLabel>
        <Select native value={category} onChange={handleChangeCategory}>
          <option aria-label="Выберите категорию" value="" />
          {categories.map((category) => (
            <option value={category.text} key={category.id}>
              {category.text}
            </option>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.textFieldStyles}
        label="Сумма"
        id="outlined-size-small"
        value={sum}
        onChange={handleChangeSum}
        variant="outlined"
        size="small"
        autoComplete="off"
      />
      <TextField
        className={classes.textFieldStyles}
        label="На что потрачено"
        id="outlined-size-small"
        value={comment}
        onChange={handleChangeComment}
        variant="outlined"
        size="small"
        autoComplete="off"
      />
      <Button
        className={classes.buttonStyles}
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
      >
        Добавить
      </Button>
      <CancelIcon
        disabled
        onClick={handleShowTextFields}
        color="secondary"
        className={classes.cancelIconStyles}
      />
    </form>
  );
};

export default ComponentTextFields;
