import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ButtonsGroup({ setShowEditForm }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={()=>setShowEditForm(true)}
        endIcon={<EditIcon />}
      >
        Edit Round
        </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => dispatch({ type: "ADD_ROUNDS"})}
        endIcon={<AddIcon />}
      >
        Play 2 More
        </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => dispatch({ type: "END_GAME" })}
        endIcon={<CheckIcon />}
      >
        Finish Game
        </Button>
    </div>
  );
}

export default ButtonsGroup;