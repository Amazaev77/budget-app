import React, { useState } from "react";
import { addExpense } from "../../../../redux/features/expenses";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import moment from "moment";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  makeStyles,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  formControl: {
    flexGrow: 2,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  cancelIcon: {
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const ComponentTextFields = ({ handleShowTextFields, showTextFields }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState("");
  const [sum, setSum] = useState("");
  const [comment, setComment] = useState("");

  const categories = useSelector((state) => state.categories.items);

  const handleAddExpense = () => {
    if (categoryId && sum && comment) {
      dispatch(addExpense(categoryId, sum, comment, moment().format()));
      setCategoryId("");
      setSum("");
      setComment("");
      handleShowTextFields();
    }
  };

  const handleChangeCategory = (e) => {
    setCategoryId(parseInt(e.target.value));
  };

  const handleChangeSum = (e) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value)) {
      setSum(value);
    }

    if (!value) {
      setSum("");
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  if (!showTextFields) {
    return null;
  }

  return (
    <Box mt={1} display="flex" alignItems="center">
      <TextField
        className={classes.root}
        label="Сумма"
        id="sum-text-field"
        value={sum}
        onChange={handleChangeSum}
        variant="outlined"
        size="small"
        autoComplete="off"
      />
      <TextField
        className={classes.root}
        label="На что потрачено"
        id="comment-text-field"
        value={comment}
        onChange={handleChangeComment}
        variant="outlined"
        size="small"
        autoComplete="off"
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Выберите категорию</InputLabel>
        <Select native value={categoryId} onChange={handleChangeCategory}>
          <option aria-label="Выберите категорию" value="" />
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.text}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddExpense}>
        Добавить
      </Button>
      <CancelIcon
        className={classes.cancelIcon}
        onClick={handleShowTextFields}
        color="secondary"
      />
    </Box>
  );
};

ComponentTextFields.propTypes = {
  handleShowTextFields: PropTypes.func.isRequired,
  showTextFields: PropTypes.bool.isRequired,
};

export default ComponentTextFields;
