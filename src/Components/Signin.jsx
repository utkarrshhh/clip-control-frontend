import React, { useState, useContext } from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { UserContext } from "../Context/UserContext";

function SignInForm() {
  const [error, setError] = useState({});

  const [selectedRole, setSelectedRole] = useState("admin");
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { token, setToken } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const handleChoice = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    let result = "";
    if (selectedRole !== "editor") {
      const response = await fetch("http://localhost:5000/api/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      result = await response.json();
    } else {
      const response = await fetch("http://localhost:5000/api/editorLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      result = await response.json();
    }
    // console.log(response);
    console.log(result);
    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      console.log(result.user);
      setTimeout(() => {
        // Redirect to home page after 5 seconds
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Session has expired. Please login again");
        setToken("");
        setUser(null);
        navigate("/signIn");
      }, 3600000);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: result.user.name,
          email: result.user.email,
          imageUpload: result.user.imageUpload,
          editors: result.user.editors,
        })
      );
      setUser(result.user);
      setToken({ token: result.token });
      navigate("/");
      // console.log(token);
    } else {
      const spanError = document.getElementById("spanError");
      spanError.textContent = `*${result.msg}*`;
      setError(result.message);
    }
    console.log(error);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  console.log(token);
  console.log(user);
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
          className="choiceContainer"
        >
          <div>
            <input
              type="radio"
              id="editor"
              name="role"
              value="editor"
              checked={selectedRole === "editor"}
              onChange={handleChoice}
              defaultChecked
            />
            <label htmlFor="editor">Editor</label>
          </div>
          <div>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={selectedRole === "admin"}
              onChange={handleChoice}
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="inputt"
        />
        <div
          id="spanError"
          style={{
            color: "red",
            display: "flex",
            position: "relative",
            width: "100%",
            fontSize: "small",
          }}
        ></div>

        <Link to="#" className="linkInput">
          Forgot your password?
        </Link>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
