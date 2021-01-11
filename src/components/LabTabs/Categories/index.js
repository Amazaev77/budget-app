import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../../redux/features/categories';

const useStyles = makeStyles(() => ({
  item: {
    fontSize: "18px",
    color: "#3f51b5",
    pointerEvents: 'none'
  },
  contained: {
    width: "100%",
  },
  category: {
    borderRadius: "3px",
    marginBottom: "8px",
    padding: "10px 0",
    backgroundColor: "#1165c3",
    color: "white",
  },
  title: {
    margin: "10px 0 35px",
    fontSize: "24px",
    color: "#101a51",
  },
  button: {
    height: "40px",
    marginLeft: "6px",
  },
}));

const Categories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");

  const newCategoryHandler = (event) => {
    setNewCategory(event.target.value);
  };

  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory, categories.length));
      setNewCategory('');
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container justify='center'>
        <Grid className={classes.title} item>
          <div>Добавить категорию</div>
          <Box mt={2}>
            <TextField
              label="Новая категория"
              id="outlined-size-small"
              variant="outlined"
              value={newCategory}
              onChange={newCategoryHandler}
              size="small"
              autoComplete="off"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleAddCategory}
            >
              Добавить
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid container justify="space-between">
          <Grid className={classes.title} item>
            Список категорий
          </Grid>
        </Grid>
        {!loading &&
          categories.map((category) => (
            <Grid
              align="center"
              className={classes.item}
              item
              md={2}
              sm={3}
              xs={6}
              key={category.id}
            >
              <div className={classes.category}>{category.text}</div>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Categories;
