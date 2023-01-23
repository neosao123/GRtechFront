import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  getQualification,
  saveBasicAddressDetails,
} from "../../networkcalls/Become_a_Retailer";

const Step1_Basic_Details = () => {
  const loader = document.querySelector("div.loader");

  let clientCode = sessionStorage.getItem("clientCode");
  let navigate = useNavigate();
  // personal details
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [qualification, setQualification] = useState();
  const [valueQualification, setValueQualification] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  //Address details
  const [houseNumber, setHouseNumber] = useState();
  const [streetName, setStreetName] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();

  //error messages
  const [nameErr, setNameErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [mobErr, setMobErr] = useState();
  const [qualificationErr, setQualificationErr] = useState();
  const [houseNumberErr, setHouseNumberErr] = useState();
  const [streetNameErr, setStreetNameErr] = useState();
  const [cityErr, setCityErr] = useState();
  const [stateErr, setStateErr] = useState();
  const [pincodeErr, setPincodeErr] = useState();

  //sessionStorage -
  let mobile = sessionStorage.getItem("mobile");
  let Email = sessionStorage.getItem("email");
  let fullName = sessionStorage.getItem("fullname");

  useEffect(() => {
    getQualification().then(
      (res) => {
        if (res.status === 200) {
          setQualification(res?.data?.result);
          //   console.log(res?.data?.result);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    setNameErr("");
    setEmailErr("");
    setMobErr("");
    setQualificationErr("");
    setHouseNumberErr("");
    setStreetNameErr("");
    setCityErr("");
    setStateErr("");
    setPincodeErr("");
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let validate = true;
    let allData = {
      clientCode: clientCode,
      fullname: "Yash Matade",
      email: "y@gmail.com",
      mobileNumber: "9860830698",
      qualification: valueQualification,
      housenumber: houseNumber,
      streetname: streetName,
      city: city,
      state: state,
      pincode: pincode,
    };

    if (allData.fullname?.trim() === undefined || allData.fullname === "") {
      setNameErr("Please enter your full name");
      validate = false;
    }

    // if(!/^[a-zA-Z]+( [a-zA-Z]+)+$/.test(allData.fullname)){
    //     setNameErr("Please enter valid name")
    // }
    if (allData.email === undefined || allData.email?.trim() === "") {
      setEmailErr("Please enter email address");
      validate = false;
    }
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(allData.email)) {
      setEmailErr("Please enter valid email address");
      validate = false;
    }
    if (
      allData.mobileNumber === undefined ||
      allData.mobileNumber?.trim() === ""
    ) {
      setMobErr("Please enter 10 digit mobile number");
      validate = false;
    }
    if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/.test(
        allData.mobileNumber
      )
    ) {
      setMobErr("Please enter 10 digit mobile number");
      validate = false;
    }
    if (valueQualification === undefined) {
      setQualificationErr("Please select your highest qualification");
      validate = false;
    }
    if (
      allData.housenumber === undefined ||
      allData.housenumber?.trim() === ""
    ) {
      setHouseNumberErr("Please enter house number");
      validate = false;
    }
    if (allData.pincode === undefined || allData.pincode?.trim() === "") {
      setPincodeErr("Please enter your pincode");
      validate = false;
    }
    if (!/^\d{6}$/.test(allData.pincode)) {
      setPincodeErr("Please enter valid pincode");
      validate = false;
    }
    if (allData.streetname === undefined || allData.streetname?.trim() === "") {
      setStreetNameErr("Please enter street name");
      validate = false;
    }
    if (allData.city === undefined || allData.city?.trim() === "") {
      setCityErr("Please enter city name");
      validate = false;
    }
    if (allData.state === undefined || allData.state?.trim() === "") {
      setStateErr("Please enter state name");
      validate = false;
    }

    if (validate) {
      setNameErr("");
      setEmailErr("");
      setMobErr("");
      setQualificationErr("");
      setHouseNumberErr("");
      setStreetNameErr("");
      setCityErr("");
      setStateErr("");
      setPincodeErr("");
      loader.classList.remove("d-none");
      saveBasicAddressDetails(allData).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.data?.status === 200) {
            swal("successful!", res?.data?.message, "success").then((ok) => {
              if (ok) {
                if (res.data.basicKYC === 1) {
                  sessionStorage.setItem("basicKYC", res.data.basicKYC);
                  navigate("/become_a_retailer/steptwo");
                } else {
                  navigate("/become_a_retailer/stepone");
                }
              }
            });
          } else {
            swal("warning!", res?.data?.message, "warning");
          }
        },
        (err) => {
          swal("warning", "server error", "error");
        }
      );
    }
  };
  return (
    <div id="unloader">
      <div className="container ">
        <div className="row">
          <div className="col-md-8 col-sm-12 col-lg-8 ">
            <div className="card mt-5 mb-4">
              <div className="card-body">
                <div className="row ">
                  <h5 style={{ fontWeight: 600 }}>Become a Retailer</h5>
                  <p>
                    To become a retailer please complete the following steps
                  </p>
                  <div className="col-md-2">
                    <div>Step 1/4</div>
                    <div class="progress mt-2 mb-2">
                      <div
                        class="gradient_class"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-md-6 mt-2"></div>

                  <div className="col-md-6">
                    <div className="">
                      <b>Personal Details</b>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">Name</label>

                        <input
                          className="form-control mt-2"
                          value={fullName}
                          // onChange={(e) => {
                          //   setFullName(e.target.value);
                          // }}
                          disabled={true}
                          type="text"
                        />
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">Email</label>
                        <input
                          className="form-control mt-2"
                          value={Email}
                          // onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          disabled={true}
                        />
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">PhoneNo</label>
                        <input
                          className="form-control mt-2"
                          value={mobile}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                          type="number"
                          disabled={true}
                        />
                        {/* <span className="text-danger">{mobErr}</span> */}
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">
                          Qualification <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select mt-2"
                          value={valueQualification}
                          onChange={(e) =>
                            setValueQualification(e.target.value)
                          }
                          name=""
                          id=""
                        >
                          <option>Select</option>
                          {qualification?.map((data) => {
                            return <option value={data}>{data}</option>;
                          })}
                        </select>
                        <span className="text-danger">{qualificationErr}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <b>Address Details</b>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6  mt-2">
                        <label htmlFor="">House No</label>
                        <input
                          className="form-control mt-2"
                          type="text"
                          value={houseNumber}
                          onChange={(e) => setHouseNumber(e.target.value)}
                        />
                        <span className="text-danger">{houseNumberErr}</span>
                      </div>
                      <div className="col-md-6 mt-2">
                        <label htmlFor="">Pincode</label>
                        <input
                          className="form-control mt-2"
                          value={pincode}
                          type="text"
                          onChange={(e) => setPincode(e.target.value)}
                        />

                        <span className="text-danger">{pincodeErr}</span>
                      </div>

                      <div className="col-md-12 mt-2">
                        <label>Street Name</label>
                        <input
                          className="form-control mt-2"
                          type="text"
                          value={streetName}
                          onChange={(e) => setStreetName(e.target.value)}
                        />
                        <span className="text-danger">{streetNameErr}</span>
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">City</label>
                        <input
                          className="form-control mt-2"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <span className="text-danger">{cityErr}</span>
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">State</label>
                        <input
                          className="form-control mt-2"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          type="text"
                        />
                        <span className="text-danger">{stateErr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1_Basic_Details;
