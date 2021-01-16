import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: 350,
    height: 28,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    "& span": {
      flexBasis: 150,
    }
  }
}));

const SkeletonBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.skeleton}>
      <Skeleton /> <Skeleton />
    </div>
  )
}

export default SkeletonBox;
