import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <section className="main-container d-flex align-items-center vh-100">
        <div className="container">
          <div className="row align-items-center">
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
                <form>
                  <label htmlFor="name">User Name</label>
                  <input id="name" type="text" name="name" />

                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" />

                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" name="password" />

                  <label htmlFor="Cpassword">Confirm Your Password</label>
                  <input id="Cpassword" type="password" name="Cpassword" />

                  {/* just allow to accept .pdf/.doc files */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap">
                      <label htmlFor="resume">Upload Resume</label>
                      <input
                        id="resume"
                        type="file"
                        name="resume"
                        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
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
