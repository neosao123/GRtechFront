import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clientProfile } from "../../networkcalls/ClientApi";
import "./myprofile.css";
const MyProfile = () => {
  //   let clientCode = sessionStorage.getItem("code");
  let navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const loader = document.querySelector("div.loader");

  let clientCode = sessionStorage.getItem("clientCode");
  useEffect(() => {
    loader.classList.remove("d-none");
    clientProfile({ clientCode: clientCode }).then(
      (data) => {
        loader.classList.add("d-none");
        setUserData(data.result);
        console.log(data.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const beComeaRetailer = (e) => {
    if (userData?.retailerSteps?.basicKYC === null) {
      navigate("/become_a_retailer/stepone");
    }
    if (userData?.retailerSteps?.basicKYC === 1) {
      navigate("/become_a_retailer/steptwo");
    }
    if (
      userData?.retailerSteps?.basicKYC === 1 &&
      userData?.retailerSteps?.aadharKYC === 1
    ) {
      navigate("/become_a_retailer/stepthree");
    }
    if (
      userData?.retailerSteps?.basicKYC === 1 &&
      userData?.retailerSteps?.aadharKYC === 1 &&
      userData?.retailerSteps?.bankKYC === 1
    ) {
      navigate("/become_a_retailer/stepfour");
      console.log(true);
    }
  };

  //circle-pro
  return (
    <div>
      <div className="container" id="unloader">
        {/* row distributed 3 + me-4 + 8 */}
        <div className="row g-4 mb-4 mt-4">
          <div className="col-md-3 col-12 mt-3   ">
            <div className="card myprofile">
              <img
                src={
                  // !null
                  //   ? userData.profilePhoto
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                }
                className="img-fluid rounded-circle ps-5 pe-5 pt-3 pb-3"
                style={{ height: "auto", width: "auto" }}
                alt="client image"
              />
              <div className="">
                <div className="text-center mb-2">
                  {" "}
                  <b>{userData.fullname}</b>{" "}
                </div>

                <div className="text-center">
                  <h6 className="text-muted">{userData.clienttype}</h6>
                </div>
                <div className="text-center mb-3">
                  <h6 className="text-success">
                    Wallet Balance: <strong> Rs.100/-</strong>
                  </h6>
                </div>
                <div className="text-center mb-3">
                  {userData?.retailerSteps?.basicKYC === 1 &&
                  userData?.retailerSteps?.bankKYC === 1 &&
                  userData?.retailerSteps?.aadharKYC === 1 &&
                  userData?.retailerSteps?.videoKYC === 1 ? (
                    <>
                      <span>You are retailer</span>
                    </>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={beComeaRetailer}
                    >
                      {" "}
                      Become a retailer
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="card myprofile p-4 mt-4">
              <Link
                to="/dashboard/trasactions"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <i className="fa-sharp fa-solid fa-list"></i>
                  </div>
                  <div className="col-md-6">Transaction List</div>
                </div>
              </Link>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <i className="fa-sharp fa-solid fa-user"></i>
                </div>
                <div className="col-md-6">Update Profile</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-3">
                  <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="col-md-6">Logout</div>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-12 mt-3 h-100 ">
            <div className="card myprofile">
              <div className="row pt-4 ps-4">
                <div className="col-md-3 col-6">
                  <b> Full Name</b>
                </div>
                <div className="col-md-6 col-6 text-muted">
                  {userData.fullname}
                </div>
              </div>
              <hr
                className=" mt-4 "
                style={{ width: "95%", margin: "0 auto" }}
              />
              <div className="row pt-4 ps-4">
                <div className="col-md-3 col-6">
                  <b> Email</b>
                </div>
                <div className="col-md-6 col-6 text-muted">
                  {userData.email}
                </div>
              </div>
              <hr
                className=" mt-4 "
                style={{ width: "95%", margin: "0 auto" }}
              />
              <div className="row pt-4 ps-4">
                <div className="col-md-3 col-6">
                  <b> Mobile Number</b>
                </div>
                <div className="col-md-6 col-6 text-muted">
                  {userData.mobileNumber}
                </div>
              </div>
              <hr
                className=" mt-4 "
                style={{ width: "95%", margin: "0 auto" }}
              />
              <div className="row pt-4 mb-4 ps-4">
                <div className="col-md-3 col-6">
                  <b> Address</b>
                </div>
                <div className="col-md-6 col-6 text-muted">
                  houseno-{userData.houseno}, {userData.streetname},{" "}
                  {userData.city}, {userData.state}, Pin-{userData.pincode}
                </div>
              </div>
            </div>
            {/* <hr className="mt-4 " style={{ width: "95%", margin: "0 auto" }} /> */}
            <div className="row">
              {/* <div className="col-md-4 mt-4 ">
                <div className="card myprofile">
                  <div className="text-center p-2  ">
                    <b>Basic details</b>
                    <hr />
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 ps-5">
                      <b>qualification :</b>
                    </div>
                    <div className="col-6">{userData.qualification}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 ps-5">
                      <b>Acc No. :</b>
                    </div>
                    <div className="col-7">90068978325892</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 ps-5">
                      <b>Acc No. :</b>
                    </div>
                    <div className="col-7">90068978325892</div>
                  </div>
                </div>
              </div> */}
              {userData?.retailerSteps?.aadharKYC === 1 ? (
                <div className="col-md-4 mt-4 ">
                  <div className="card myprofile">
                    <div className="text-center p-2  ">
                      <b>KYC details</b>
                      <hr />
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b>Aadhar no :</b>
                      </div>
                      <div className="col-6">{userData?.aadharcardnumber}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b>Pancard no :</b>
                      </div>
                      <div className="col-6">{userData?.pancardnumber}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b></b>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {userData?.retailerSteps?.bankKYC === 1 ? (
                <div className="col-md-4 mt-4 ">
                  <div className="card myprofile">
                    <div className="text-center p-2  ">
                      <b>Bank details</b>
                      <hr />
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b>Bank Name :</b>
                      </div>
                      <div className="col-6">{userData?.bankname}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b>Account no :</b>
                      </div>
                      <div className="col-6">{userData.banknumber}</div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 ps-5">
                        <b>IFSC code :</b>
                      </div>
                      <div className="col-6">{userData?.ifsccode}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
