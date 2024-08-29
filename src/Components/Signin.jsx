import React, { useState, useContext } from "react";
import "./Styles.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { UserContext } from "../Context/UserContext";

function SignInForm() {
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [state, setState] = useState({
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

    try {
      const response = await fetch(
        `http://localhost:5000/api/${selectedRole}Login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      result = await response.json();
      console.log("here before , - > ", result.user);
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        console.log("here");
        setTimeout(() => {
          // Redirect to the sign-in page after 1 hour
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          alert("Session has expired. Please login again");
          setToken("");
          setUser(null);
          navigate("/signIn");
        }, 3600000);
        console.log(result.user);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            name: result.user.name,
            email: result.user.email,
            imageUpload: result.user.imageUpload,
            editors: result.role === "admin" ? result.user.editors : "nothing",
            id: result.id,
          })
        );

        setUser(result.user);
        setToken(result.token);
        navigate("/");
        window.location.reload();
      } else {
        setError(result.msg);
      }
    } catch (err) {
      console.log(err.message);
      setError("An error occurred while logging in. Please try again.");
    }

    // Clear the form fields
    setState({
      email: "",
      password: "",
    });
  };

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

        {error && (
          <div
            style={{
              color: "red",
              display: "flex",
              position: "relative",
              width: "100%",
              fontSize: "small",
            }}
          >
            *{error}*
          </div>
        )}

        <Link to="#" className="linkInput">
          Forgot your password?
        </Link>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
