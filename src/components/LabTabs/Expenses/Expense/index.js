import React from "react";
import { IconButton, TableRow, TableCell } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  copyExpense,
  deleteExpense,
} from "../../../../redux/features/expenses";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const Expense = ({ expense }) => {
  const dispatch = useDispatch();

  const category = useSelector((state) =>
    state.categories.items.find(
      (category) => expense.categoryId === category.id
    )
  );

  const deleting = useSelector((state) => state.expenses.deleting);
  const copying = useSelector((state) => state.expenses.copying);

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(expense.id));
  };

  const handleCopyExpense = () => {
    dispatch(copyExpense(expense, moment().format()));
  };

  return (
    <TableRow>
      <TableCell>{category?.text}</TableCell>
      <TableCell>{expense.sum} руб</TableCell>
      <TableCell>{moment(expense.date).format("L / LT")}</TableCell>
      <TableCell>{expense.comment}</TableCell>
      <TableCell>
        <IconButton
          color="secondary"
          aria-label="delete"
          onClick={deleteExpenseHandler}
          disabled={deleting === expense.id}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={handleCopyExpense}
          disabled={copying === expense.id}
        >
          <FileCopyIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

Expense.propTypes = {
  expense: PropTypes.object.isRequired,
};

export default Expense;
