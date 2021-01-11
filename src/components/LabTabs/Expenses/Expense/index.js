import React, { useEffect, useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  copyExpense,
  deleteExpense,
  editExpense,
} from "../../../../redux/features/expenses";
import Input from "@material-ui/core/Input";
import CheckIcon from "@material-ui/icons/Check";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import moment from 'moment';
import 'moment/locale/ru';

const useStyles = makeStyles(() => ({
  tableRow: {
    "& td": {
      color: "#2a3472",
    },
  },
  colorGreen: {
    color: "#2ba832",
  },
  margin: {
    marginRight: "5px",
    marginLeft: "5px",
  },
  inputStyles: {
    maxWidth: "100px",
    fontSize: "12px",
  },
  buttonStyleDefault: {
    cursor: "none",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  width: {
    width: "48px",
  },
  formControl: {
    width: "100%",
    "& option": {
      fontSize: "12px",
    },
    transform: "translateY(-9px)",
  },
  label: {
    width: "170px",
    fontSize: "14px",
  },
  select: {
    fontSize: "12px",
  },
}));

const Expense = ({ expense }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ru')
  }, [])

  const [showEditInputs, setShowEditInputs] = useState(false);

  const [sum, setSum] = useState(expense.sum);
  const [comment, setComment] = useState(expense.comment);
  const [category, setCategory] = useState(expense.category);

  const expenses = useSelector((state) => state.expenses.items);
  const categories = useSelector((state) => state.categories.items);

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(expense.id));
  };

  const handleCopyExpense = () => {
    dispatch(copyExpense(expense, expenses.length));
  };

  const handleChangeSum = (e) => {
    setSum(e.target.value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleClickInputs = () => {
    setShowEditInputs(true);
  };

  const editExpenseHandler = () => {
    if (sum && comment && category) {
      dispatch(editExpense(expense.id, sum, comment, category));
      setShowEditInputs(false);
    }
  };
  return (
    <TableRow className={classes.tableRow}>
      <TableCell>
        {!showEditInputs && expense.category}
        {showEditInputs && (
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label} htmlFor="age-native-simple">
              Выберите категорию
            </InputLabel>
            <Select
              native
              value={category}
              onChange={handleChangeCategory}
              className={classes.select}
            >
              <option aria-label="Выберите категорию" value="" />
              {categories.map((category) => (
                <option value={category.text} key={category.id}>
                  {category.text}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </TableCell>
      <TableCell>
        {!showEditInputs && expense.sum}
        {showEditInputs && (
          <Input
            placeholder="Новое значение"
            value={sum}
            onChange={handleChangeSum}
            inputProps={{ "aria-label": "description" }}
            className={classes.inputStyles}
          />
        )}
      </TableCell>
      <TableCell>
        {moment(expense.date).format('LT')}
      </TableCell>
      <TableCell>
        {!showEditInputs && expense.comment}
        {showEditInputs && (
          <Input
            placeholder="Новое значение"
            value={comment}
            onChange={handleChangeComment}
            inputProps={{ "aria-label": "description" }}
            className={classes.inputStyles}
          />
        )}
      </TableCell>
      <TableCell>
        <IconButton
          className={!showEditInputs ? classes.colorGreen : null}
          aria-label="delete"
          disabled={showEditInputs}
          onClick={handleClickInputs}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className={classes.margin}
          color="secondary"
          aria-label="delete"
          disabled={showEditInputs}
          onClick={deleteExpenseHandler}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          disabled={showEditInputs}
          onClick={handleCopyExpense}
        >
          <FileCopyIcon />
        </IconButton>
        <span className={classes.width}>
          {showEditInputs && (
            <IconButton
              className={classes.colorGreen}
              aria-label="delete"
              onClick={editExpenseHandler}
            >
              <CheckIcon />
            </IconButton>
          )}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Expense;
