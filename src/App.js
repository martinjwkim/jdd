import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { decode } from "jsonwebtoken";
import Navigation from './Navigation'
import Routes from './Routes'
import Api from "./Api";
import useLocalStorage from "./useLocalStorage";
import './App.css';

export const TOKEN_STORAGE_ID = "choidaidi-token";

function App() {

  const dispatch = useDispatch();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await Api.getCurrentUser(username);
        dispatch({ type: "SET_USER", user: currentUser })
      } catch (err) {
        dispatch({ type: "LOGOUT_USER"});
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes setToken={setToken}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

//bigger font
//animation when losing
//winner screen
//icon instead of numbers
