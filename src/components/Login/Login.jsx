import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
// import { LoginRequest } from "../../APIRequests/APIRequest";
import axios from "axios";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  SuccessToast,
} from "../../helpers/FormHelper";
import { HideLoader, ShowLoader } from "../../redux/state-slice/settingsSlice";
import store from "../../redux/store/store";
const baseURL = "http://localhost:5050/api/v1";

const Login = () => {
  let passRef,
    emailRef = useRef();

  const SubmitLogin = async () => {
    // e.preventDefault();
    let email = emailRef.value;
    let pass = passRef.value;

    let URL = baseURL + "/login";
    let PostBody = { email: email, password: pass };
    if (IsEmail(email)) {
      ErrorToast("Invalid Email Address");
    } else if (IsEmpty(pass)) {
      ErrorToast("Password Required");
    } else {
      try {
        store.dispatch(ShowLoader());
        const { data } = await axios.post(URL, PostBody);
        store.dispatch(HideLoader());
        if (data?.error) {
          ErrorToast(data.error);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userDetails", JSON.stringify(data.user));
          SuccessToast("Login Successfully");
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
        store.dispatch(HideLoader());
        ErrorToast("Login Failed! Invalid email or pass");
      }
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h4>SIGN IN</h4>
                <br />
                <input
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                  ref={(input) => (emailRef = input)}
                />
                <br />
                <input
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                  type="password"
                  ref={(input) => (passRef = input)}
                />
                <br />
                <button
                  onClick={SubmitLogin}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
                <hr />
                <div className="float-end mt-3">
                  <span>
                    <Link
                      className="text-center ms-3 h6 animated fadeInUp"
                      to="/Register"
                    >
                      Sign Up{" "}
                    </Link>
                    <span className="ms-1">|</span>
                    <Link
                      className="text-center ms-3 h6 animated fadeInUp"
                      to="/sendOTP"
                    >
                      Forget Password
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
