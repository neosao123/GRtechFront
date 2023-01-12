import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clientProfile } from "../../networkcalls/ClientApi";
import "./myprofile.css";
const MyProfile = () => {
  //   let clientCode = sessionStorage.getItem("code");
  const [userData, setUserData] = useState({});
  let clientCode = sessionStorage.getItem("clientCode");
  useEffect(() => {
    clientProfile({ clientCode: clientCode }).then(
      (data) => {
        setUserData(data.result);
        console.log(data.result);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  //circle-pro
  return (
    <div>
      <div className="container">
        {/* row distributed 3 + me-4 + 8 */}
        <div className="row g-0 ">
          <div className="col-md-3 col-12 mt-3 me-4 card myprofile">
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
                <button className="btn btn-success btn-sm">
                  {" "}
                  Beacome a retailer
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-12 mt-3 card myprofile">
            <div className="row pt-4 ps-4">
              <div className="col-md-3 col-6">
                <b> Full Name</b>
              </div>
              <div className="col-md-6 col-6 text-muted">
                {userData.fullname}
              </div>
            </div>
            <hr className=" mt-4 " style={{ width: "95%", margin: "0 auto" }} />
            <div className="row pt-4 ps-4">
              <div className="col-md-3 col-6">
                <b> Email</b>
              </div>
              <div className="col-md-6 col-6 text-muted">{userData.email}</div>
            </div>
            <hr className=" mt-4 " style={{ width: "95%", margin: "0 auto" }} />
            <div className="row pt-4 ps-4">
              <div className="col-md-3 col-6">
                <b> Mobile Number</b>
              </div>
              <div className="col-md-6 col-6 text-muted">
                {userData.mobileNumber}
              </div>
            </div>
            <hr className=" mt-4 " style={{ width: "95%", margin: "0 auto" }} />
            <div className="row pt-4 ps-4">
              <div className="col-md-3 col-6">
                <b> Address</b>
              </div>
              <div className="col-md-6 col-6 text-muted">
                {userData.address}
              </div>
            </div>
            <hr className=" mt-4 " style={{ width: "95%", margin: "0 auto" }} />
            <div className="row pt-4 ps-4">
              <div className="col-md-3 col-6">
                <b> House No.</b>
              </div>
              <div className="col-md-6 col-6 text-muted">
                {userData.houseno}
              </div>
            </div>
            {/* <hr className=" mt-4 " style={{ width: "95%", margin: "0 auto" }} /> */}
          </div>
        </div>

        <div className="row g-0 mt-4">
          <div className="col-md-3 me-4 col-12 card myprofile p-4">
            <Link
              to="/dashboard/trasactions"
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              <div className="row">
                <div className="col-md-3">
                  <i class="fa-sharp fa-solid fa-list"></i>
                </div>
                <div className="col-md-6">Transaction List</div>
              </div>
            </Link>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <i class="fa-sharp fa-solid fa-user"></i>
              </div>
              <div className="col-md-6">Update Profile</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
              </div>
              <div className="col-md-6">Logout</div>
            </div>
          </div>
          <div className="col-md-4 me-4 card">
            <div className="text-center p-2">
              <b> Bank details</b>
              <hr />
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
          </div>
          <div className="col-md-4 me-4 card">
            <div className="text-center p-2">
              <b> KYC details</b>
              <hr />
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
            <div className="row mb-2">
              <div className="col-5 ps-5">
                <b>Account No. :</b>
              </div>
              <div className="col-7">90068978325892</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
