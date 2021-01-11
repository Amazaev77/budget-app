import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "react-loading-skeleton";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  margin: {
    marginRight: "5px",
    marginLeft: "5px",
  },
}));

const PreloaderToTable = ({ StyledTableCell }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <StyledTableCell>
        {" "}
        <Skeleton width={150} height={20} />{" "}
      </StyledTableCell>
      <StyledTableCell>
        {" "}
        <Skeleton width={150} height={20} />{" "}
      </StyledTableCell>
      <StyledTableCell>
        {" "}
        <Skeleton width={150} height={20} />{" "}
      </StyledTableCell>
      <StyledTableCell>
        <IconButton disabled aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton
          disabled
          className={classes.margin}
          color="secondary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton disabled aria-label="delete">
          <FileCopyIcon />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default PreloaderToTable;
