import React from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import moment from "moment";
import Statistic from "./Statistic";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body1: {
    paddingTop: theme.spacing(1.8),
    paddingBottom: theme.spacing(1.8),
  },
  h5: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    borderRadius: "4px",
  },
}));

const Statistics = () => {
  const classes = useStyles();

  const expenses = useSelector((state) => state.expenses.items);

  const monthlyExpenses = expenses.reduce((accum, expense) => {
    if (moment(expense.date).format("MMMM") === moment().format("MMMM")) {
      accum += expense.sum;
    }

    return accum;
  }, 0);

  const allExpenses = expenses.reduce((accum, expense) => {
    accum += expense.sum;

    return accum;
  }, 0);

  return (
    <>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid align="center" item md={3} xs={12} sm={5}>
          <Typography
            variant="h5"
            className={`${classes.body1} ${classes.h5}`}
            border={1}
          >
            расходы за этот месяц
          </Typography>
          <Box border={1} borderRadius="borderRadius">
            <Typography variant="h6" className={classes.body1}>
              {monthlyExpenses} рублей
            </Typography>
          </Box>
        </Grid>
        <Grid align="center" item md={3} xs={12} sm={5}>
          <Typography
            variant="h5"
            className={`${classes.body1} ${classes.h5}`}
            border={1}
          >
            расходы за всё время
          </Typography>
          <Box border={1} borderRadius="borderRadius">
            <Typography variant="h6" className={classes.body1}>
              {allExpenses} рублей
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Statistic />
    </>
  );
};

export default Statistics;
