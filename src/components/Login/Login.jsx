import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import joi from "joi";

export default function Login({ usersList, saveUserData }) {
  // navigate hook
  let navigate = useNavigate();

  // state for set user data
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // state for user errors
  const [errorList, setErrorList] = useState("");

  // state for validation errors
  const [error, setError] = useState([]);

  // collect data from user using inputs
  function getUserData(e) {
    setErrorList(null);
    setError([]);
    let myData = { ...user };
    myData[e.target.name] = e.target.value;
    setUser(myData);
  }

  // check from data collected if user exist or not!!
  function checkUserExist(users, user) {
    let result = users?.find(
      (ele) =>
        ele.data.email === user.email && ele.data.password === user.password
    );
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  // check data entry validation by user..
  function checkInputsValidation(data) {
    const schema = joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    const validationResult = schema.validate(data, { abortEarly: false });
    if (validationResult.error) {
      return validationResult.error.details;
    } else {
      return true;
    }
  }

  //submit for user login inputs data..
  function submitLoginData(e) {
    e.preventDefault();
    const checkValidation = checkInputsValidation(user);
    // check validation first before anything..
    if (checkValidation === true) {
      const checkUser = checkUserExist(usersList, user);
      // then check user exist??
      if (checkUser) {
        // user is exist and go ahead...
        alert("Success Login");
        navigate("/home");
        localStorage.setItem("user", JSON.stringify(checkUser.data));
        saveUserData();
      } else {
        // user is not exist before, handel this error?!\
        setErrorList("error login data, please try again");
      }
    } else {
      setError(checkValidation);
    }
  }
  return (
    <>
      <section className="register-container d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="main-alert d-flex justify-content-center flex-wrap">
              {errorList ? (
                <div className="alert alert-danger w-auto mx-2">
                  {errorList}
                </div>
              ) : (
                ""
              )}
              {error
                ? error.map((ele) => {
                    return (
                      <div className="alert alert-danger w-auto mx-2">
                        {ele.message}
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="col-md-6">
              <div className="register_info w-100">
                <h3 className="mb-3">Wellcome to Job Seeker Platform</h3>
                <p>Wellcome Back</p>
                <p>
                  Please, login with your email used before for registeration.
                </p>
                <Link to="/">Create New Account?</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="register_form d-flex flex-column w-100">
                <form onSubmit={submitLoginData}>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={getUserData}
                    id="email"
                    type="email"
                    name="email"
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    onChange={getUserData}
                    id="password"
                    type="password"
                    name="password"
                  />
                  <button className="ms-3" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
