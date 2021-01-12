import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "react-loading-skeleton";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles(() => ({
  tdChild: {
    width: '132px'
  }
}));

const PreloaderToTable = () => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <div className={classes.tdChild}><Skeleton width={132} height={20} /></div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}><Skeleton width={132} height={20} /></div>
      </TableCell>
      <TableCell>
        <div className={classes.tdChild}><Skeleton width={132} height={20} /></div>
      </TableCell>
      <TableCell>
        <div>
          <IconButton disabled aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton
            disabled
            color="secondary"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton disabled aria-label="delete">
            <FileCopyIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PreloaderToTable;
