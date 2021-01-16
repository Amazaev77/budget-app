import React, { useState } from "react";
import NativeSelects from "./NativeSelects";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

const Statistic = () => {
  const classes = useStyles();
  const [month, setMonth] = useState("Январь");

  const expenses = useSelector((state) => state.expenses.items);
  const categories = useSelector((state) =>
    state.categories.items.map((category) => {
      return {
        ...category,
        total: expenses.reduce((acc, expense) => {
          if (month.toLowerCase() !== moment(expense.date).format("MMMM")) {
            return acc;
          }

          if (category.id === expense.categoryId) {
            return acc + expense.sum;
          }
          return acc;
        }, 0),
      };
    })
  );

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Box mb={2} mt={6}>
        <Grid container alignItems="center" justify="center">
          <Grid item md={4}>
            <Typography component="h5">Потрачено за</Typography>
          </Grid>
          <Grid item md={4}>
            <NativeSelects
              month={month}
              handleChangeMonth={handleChangeMonth}
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Категория</TableCell>
              <TableCell className={classes.head}>Сумма</TableCell>
            </TableRow>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.text}</TableCell>
                <TableCell>{category.total}</TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Statistic;
