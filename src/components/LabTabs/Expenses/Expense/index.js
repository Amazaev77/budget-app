import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { copyExpense, deleteExpense } from "../../../../redux/features/expenses";
import TableCell from "@material-ui/core/TableCell";
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
  tdChild: {
    width: '132px'
  }
}));

const Expense = ({ expense }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ru')
  }, [])

  const expenses = useSelector((state) => state.expenses.items);

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(expense.id));
  };

  const handleCopyExpense = () => {
    dispatch(copyExpense(expense, expenses.length, moment().format()));
  };

  return (
    <TableRow className={classes.tableRow}>
      <TableCell>
        <div className={classes.tdChild}>{expense.category}</div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}>{expense.sum}</div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}>
          {moment(expense.date).format('L / LT')}
        </div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}>{expense.comment}</div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}>
          <IconButton
            className={classes.margin}
            color="secondary"
            aria-label="delete"
            onClick={deleteExpenseHandler}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleCopyExpense}
          >
            <FileCopyIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Expense;
