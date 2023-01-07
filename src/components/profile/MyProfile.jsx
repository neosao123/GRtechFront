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

  return (
    <div>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-3">
            <div className="card rounded-4 depth">
              <img
                className="circle-pro mx-auto  img-fluid mt-3"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="..."
              />
              <h4 className="text-center mt-2">{userData?.fullname}</h4>

              <div className="card-body">
                <div className="text-center d-grid">
                  <b className="text-success cursorPointer">
                    Become a Retailer
                  </b>{" "}
                  <hr />
                  <br />
                  <button className="btn gradient_class rounded-pill">
                    Update Profile
                  </button>
                  <br />
                  <button className="btn gradient_class rounded-pill">
                    Logout
                  </button>
                  <br />​
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 card rounded-4 depth">
            <div className="">
              <div className="card-body">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <div className="text-layout ps-3">
                      <h6>Personal Details</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="fullname">FullName:</label>
                    <br />
                    <input
                      className="form-control"
                      value={userData?.fullname}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="phoneno">PhoneNo:</label>
                    <br />
                    <input
                      className="form-control"
                      value={userData.mobile}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                      className="form-control"
                      value={userData.email}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="qualification">Qualification:</label>
                    <br />
                    <input
                      className="form-control"
                      value={userData.qualification}
                      type="text"
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="text-layout ps-3 ">
                      <h6>Address Details</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="fullname">House No:</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="phoneno">City</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="email">State</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="qualification">StreetName</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="qualification">Pin Code</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="text-layout ps-3">
                      <h6>Bank Details</h6>
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="fullname">Adhar No</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="phoneno">PAN No</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="email">Bank Name</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="col-md-6 mt-2">
                    <label htmlFor="qualification">IFSC code</label>
                    <br />
                    <input className="form-control" value="" type="text" />
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <button className="btn gradient_class" type="button">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
