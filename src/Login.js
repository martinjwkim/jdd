import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Alert from "./Alert";
import Api from "./Api";

function Login({ setToken }) {
  const history = useHistory();
  const [activeView, setActiveView] = useState("login");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    group_name: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    errors: []
  });

  function setLoginView() {
    setActiveView("login");
  }

  function setSignupView() {
    setActiveView("signup");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data;
    let endpoint;

    if (activeView === "signup") {
      // these fields aren't req'd---pass undefined, not empty string
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        group_name: loginInfo.group_name,
        player1: loginInfo.player1,
        player2: loginInfo.player2,
        player3: loginInfo.player3,
        player4: loginInfo.player4,
      };
      endpoint = "register";
    } else {
      data = {
        username: loginInfo.username,
        password: loginInfo.password
      };
      endpoint = "login";
    }

    let token;

    try {
      token = await Api[endpoint](data);
    } catch (errors) {
      return setLoginInfo(l => ({ ...l, errors }));
    }

    setToken(token);
    // TODO: set round and players
    history.push("/");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo(l => ({ ...l, [name]: value }));
  }

  let loginActive = activeView === "login";

  const signupFields = (
    <div>
      <div className="form-group">
        <label>Group name</label>
        <input
          name="group_name"
          className="form-control"
          value={loginInfo.group_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Player 1 Name</label>
        <input
          name="player1"
          className="form-control"
          value={loginInfo.player1}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Player 2 Name</label>
        <input
          name="player2"
          className="form-control"
          value={loginInfo.player2}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Player 3 Name</label>
        <input
          name="player3"
          className="form-control"
          value={loginInfo.player3}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Player 4 Name</label>
        <input
          name="player4"
          className="form-control"
          value={loginInfo.player4}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div className="Login">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="d-flex justify-content-end">
          <div className="btn-group">
            <button
              className={`btn btn-primary ${loginActive ? "active" : ""} `}
              onClick={setLoginView}
            >
              Login
            </button>
            <button
              className={`btn btn-primary ${loginActive ? "" : "active"} `}
              onClick={setSignupView}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={loginInfo.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              </div>
              {loginActive ? "" : signupFields}
              {loginInfo.errors.length ? (
                <Alert type="danger" messages={loginInfo.errors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
