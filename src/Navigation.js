import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    fontSize: '20px',
    margin: '10px'
  }
}));

function Navigation() {

  const history = useHistory();
  const classes = useStyles();

  const handleClick = (route) => {
    history.push(route)
  }

  return (
    <div className={classes.root}>
      <AppBar color='primary' position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="home" onClick={()=>handleClick('/')}>
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          <Button className={classes.button} color="inherit" onClick={()=>handleClick('/')}>New Game</Button>
          <Button className={classes.button} color="inherit" onClick={()=>handleClick('scores')}>Scores</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
