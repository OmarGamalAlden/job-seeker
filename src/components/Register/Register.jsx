import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ResumeStorage } from "../../firebase/firebase.js";
import joi from "joi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //navigate hook
  let navigate = useNavigate();

  // state for collect user data!!
  const [userData, setUserData] = useState({});

  // state for save user resume
  const [pdfFile, setpdfFile] = useState(null);

  // state for dispaly & handel error
  const [errorList, setErrorList] = useState([]);

  // save resume user URL!!
  const [userCVurl, setUserCVurl] = useState(null);

  // collect data from user using inputs
  function getUserData(e) {
    setErrorList([]);
    let myData = { ...userData };
    myData[e.target.name] = e.target.value;
    if (e.target.files) {
      setpdfFile(e.target.files[0]);
      myData.resume = e.target.files[0];
    }
    setUserData(myData);
  }

  // check data entry validation by user..
  function checkInputsValidation(data) {
    const schema = joi.object({
      name: joi.string().min(3).max(20).required(),
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      Cpassword: joi.valid(joi.ref("password")).required(),
      resume: joi.required(),
    });
    const validationResult = schema.validate(data, { abortEarly: false });
    if (validationResult.error) {
      return validationResult.error.details;
    } else {
      return true;
    }
  }

  // handel firebase cases
  const uploadUserResume = (resume) => {
    const pdfRef = ref(ResumeStorage, `Resumes/${resume.name}`);
    const uploadTask = uploadBytesResumable(pdfRef, resume);
    uploadTask.on(
      "state_changed",
      alert("Suceess Registeration, you are going to login!!"),
      (err) => console.log(err),
      () => {
        // download the user resume url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUserCVurl(url);
          // after upload pdf, then save user data and call it's function
          uploadUserData({ ...userData }, url);
        });
      }
    );
  };

  const uploadUserData = async (data, url) => {
    data.resume = url;
    let { name, email, password, resume } = data;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, resume }),
    };
    const res = await fetch(
      "https://job-seeker-5ec5b-default-rtdb.firebaseio.com/userData.json",
      options
    );
    if (!res) {
      alert("Error Occured");
    }
  };

  //submit form data after collecting from user
  function submitUserData(e) {
    e.preventDefault();
    const result = checkInputsValidation(userData);
    if (result !== true) {
      //there is an error need to handel !?
      setErrorList(result);
    } else {
      // everything is good, go ahead...in side it called the uploadUserData!!
      uploadUserResume(pdfFile);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <>
      <section className="register-container d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="main-alert d-flex justify-content-center flex-wrap">
              {errorList.length
                ? errorList.map((err, index) => {
                    return (
                      <div
                        key={index}
                        className="alert alert-danger w-auto mx-2"
                      >
                        {err.message}
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="col-md-6">
              <div className="register_info w-100">
                <h3 className="mb-3">Wellcome to Job Seeker Platform</h3>
                <p>Feel free to create a new account.</p>
                <p>
                  Please, provide a correct data to match sutable jobs for you.
                </p>
                <Link to="/login">Already Registerd? Signin..</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="register_form d-flex flex-column w-100">
                <form onSubmit={submitUserData}>
                  <label htmlFor="name">User Name</label>
                  <input
                    onChange={getUserData}
                    id="name"
                    type="text"
                    name="name"
                  />

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

                  <label htmlFor="Cpassword">Confirm Your Password</label>
                  <input
                    onChange={getUserData}
                    id="Cpassword"
                    type="password"
                    name="Cpassword"
                  />

                  {/* just allow to accept .pdf/.doc files */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap">
                      <label htmlFor="resume">Upload Resume</label>
                      <input
                        onChange={getUserData}
                        id="resume"
                        type="file"
                        name="resume"
                        accept="application/pdf"
                      />
                    </div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
