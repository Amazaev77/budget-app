import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { useSelector } from 'react-redux'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  gridItemChildren: {
    backgroundColor: "#1b276c",
    color: "white",
    fontSize: "18px",
    padding: "15px 0",
    borderRadius: "4px 4px 0 0",
  },
  gridItem: {
    "& div:last-child": {
      fontSize: "21px",
      color: "#101a51",
      border: "1px solid #1b276c",
      borderRadius: "0 0 4px 4px",
      padding: "25px 0",
    },
    spentMonthBox: {
      fontSize: "18px",
    },
  },
}));

const ExpenseStatistics = ({ children }) => {
  const classes = useStyles();

  const expenses = useSelector((state) => state.expenses.items);

  const monthlyExpenses = expenses.reduce((accum, expense) => {
    if (moment(expense.date).format('MMMM') === moment().format('MMMM') ) {
      accum += expense.sum
    }

    return accum
  }, 0)

  const allExpenses = expenses.reduce((accum, expense) => {
    accum += expense.sum
    return accum;
  }, 0)

  return (
    <>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid
          className={classes.gridItem}
          align="center"
          item
          md={3}
          xs={12}
          sm={5}
        >
          <div className={classes.gridItemChildren}>расходы за месяц</div>
          <div>{monthlyExpenses} рублей</div>
        </Grid>
        <Grid
          className={classes.gridItem}
          align="center"
          item
          md={3}
          xs={12}
          sm={5}
        >
          <div className={classes.gridItemChildren}>расходы за всё время</div>
          <div>{allExpenses} рублей</div>
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default ExpenseStatistics;
