import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from "react-redux";
import ScoreGraph from './ScoreGraph'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function GraphContainer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const players = useSelector(store => store.players)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="All Players" {...a11yProps(0)} />
          <Tab label={players.player1} {...a11yProps(1)} />
          <Tab label={players.player2} {...a11yProps(2)} />
          <Tab label={players.player3} {...a11yProps(3)} />
          <Tab label={players.player4} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ScoreGraph player1='player1' player2='player2' player3='player3' player4='player4'/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScoreGraph player1='player1'/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ScoreGraph player2='player2'/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ScoreGraph player3='player3'/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ScoreGraph player4='player4'/>
      </TabPanel>
    </div>
  );
}

export default GraphContainer;
