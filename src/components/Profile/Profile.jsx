import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetProfileDetails } from "../../APIRequests/APIRequest";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
  SuccessToast,
  getBase64,
} from "../../helpers/FormHelper";
import { getToken, setUserDetails } from "../../helpers/SessionHelper";
import { HideLoader, ShowLoader } from "../../redux/state-slice/settingsSlice";
import store from "../../redux/store/store";
const AxiosHeader = { headers: { authorization: getToken() } };

function Profile() {
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();

  useEffect(() => {
    GetProfileDetails();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);
  console.log(ProfileData);

  const PreviewImage = () => {
    let ImgFile = userImgRef.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const navigate = useNavigate();

  const updateMyProfile = async () => {
    store.dispatch(ShowLoader());
    const baseURL = "http://localhost:5050/api/v1";
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;

    let userDetails = [
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        photo: photo,
      },
    ];

    if (IsEmail(email)) {
      ErrorToast("Valid email Required");
    } else if (IsEmpty(firstName)) {
      ErrorToast("First Name Required !");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last Name Required !");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Valid Mobile  Required !");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required !");
    } else {
      try {
        const URL = `${baseURL}/updateProfile`;
        let postBody = {
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          password: password,
          photo: photo,
        };
        const { data } = await axios.put(URL, postBody, AxiosHeader);
        store.dispatch(HideLoader());
        if (data?.error) {
          ErrorToast(data.error);
        } else {
          SuccessToast("Update successful");
          setUserDetails(userDetails);
          navigate("/");
        }
      } catch (error) {
        store.dispatch(HideLoader());
        console.log(error);
        ErrorToast("Update failed! Try again");
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={(input) => (userImgView = input)}
                  className="icon-nav-img-lg"
                  src={ProfileData["photo"]}
                  alt=""
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      ref={(input) => (userImgRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="file"
                      onChange={PreviewImage}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["email"]}
                      readOnly={true}
                      ref={(input) => (emailRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["firstName"]}
                      ref={(input) => (firstNameRef = input)}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["lastName"]}
                      ref={(input) => (lastNameRef = input)}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["mobile"]}
                      ref={(input) => (mobileRef = input)}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["password"]}
                      ref={(input) => (passwordRef = input)}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={updateMyProfile}
                      className="btn w-100 float-end btn-primary animated fadeInUp"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
