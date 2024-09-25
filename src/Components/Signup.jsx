import React, { useState } from "react";
import { toast } from "react-toastify";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    specialToken: "",
  });

  const [selectedRole, setSelectedRole] = useState("admin");

  const handleChoice = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { name, email, password, specialToken } = state;
    if (selectedRole !== "editor") {
      const response = await fetch(
        "http://192.168.37.195:5000/api/adminSignup" ||
          "http://localhost:5000/api/adminSignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const resTemp = await response.json();
      if (resTemp.success) {
        toast.success("User Registered successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error(`User registration failed! Try again. - > ${resTemp.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      console.log(resTemp);
    } else {
      const response = await fetch("http://localhost:5000/api/editorSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, token: specialToken }),
      });
      const resTemp = await response.json();
      if (resTemp.success) {
        toast.success("User Registered successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        console.log(resTemp);
      } else {
        toast.error(`User registration failed! Try again. - > ${resTemp.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }

    const resetState = {};
    for (const key in state) {
      resetState[key] = "";
    }

    setState(resetState);
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

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
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {selectedRole === "editor" && (
          <input
            type="text"
            name="specialToken"
            value={state.specialToken}
            onChange={handleChange}
            placeholder="Special Token"
          />
        )}
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
