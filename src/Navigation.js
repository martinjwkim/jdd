import React from 'react';
import { useSelector } from 'react-redux'
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
    fontSize: '1.5vw',
    margin: '5px'
  }
}));

function Navigation({handleLogOut}) {

  const history = useHistory();
  const classes = useStyles();
  const user = useSelector(store => store.user)

  const handleClick = (route) => {
    history.push(route)
  }

  const logOut = () => {
    history.push('/')
    handleLogOut()
  }

  return (
    <div className={classes.root}>
      <AppBar color='primary' position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="home" onClick={() => handleClick('/')}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {user ?
            <div>
              <Button className={classes.button} color="inherit" onClick={() => handleClick('/newgame')}>New Game</Button>
              <Button className={classes.button} color="inherit" onClick={() => handleClick('scores')}>Scores</Button>
              <Button className={classes.button} color="inherit" onClick={() => handleClick('graph')}>Stats</Button>
              <Button className={classes.button} color="inherit" onClick={() => logOut()}>Logout</Button>
            </div>
            : <Button className={classes.button} color="inherit" onClick={() => handleClick('/login')}>Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
