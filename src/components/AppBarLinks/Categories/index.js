import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  TextField,
  Paper,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import Category from "./Category";
import { addCategory } from "../../../redux/features/categories";
import SkeletonBox from '../../SkeletonBox';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 370,
    overflowX: 'hidden'
  },
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));


const Categories = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  const [newCategory, setNewCategory] = useState("");

  const newCategoryHandler = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAddCategory();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={1} mb={2} display="flex">
        <Box mr={1.5}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Новая категория"
            variant="outlined"
            value={newCategory}
            onChange={newCategoryHandler}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddCategory}
        >
          Добавить
        </Button>
      </Box>
      <TableContainer component={Paper} className={classes.root} elevation={3}>
        <Table size="small" aria-label="customized table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.head}>
                Категории
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>
                  <SkeletonBox />
                  <SkeletonBox />
                </TableCell>
                <TableCell>
                  ыыыыфввввв
                </TableCell>
              </TableRow>
            )}
            {!loading && categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Categories;
