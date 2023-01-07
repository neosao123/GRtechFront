import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/GR_tech_logo/GRTECH PAYMENT Final-2.png";
import { useLocation } from "react-router-dom";
import { CompleteKyc } from "../../networkcalls/ClientApi";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";

const Kyc = () => {
  const [loading, setLoading] = useState(false);

  let clientCode = sessionStorage.getItem("clientCode");
  let fullname = sessionStorage.getItem("fullname");
  const navigate = useNavigate();
  const [data, setData] = useState({
    clientCode: clientCode,
    pancard: "",
    nameonpan: fullname,
  });
  const [nameonpanErr, setNameonPanErr] = useState();
  const [pancardErr, setPanCardErr] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const submit = async (e) => {
    let validate = true;
    if (data.nameonpan === "") {
      setNameonPanErr("Please enter name on pancard");
      validate = false;
    }
    if (!/^[a-zA-Z ]{3,150}$/.test(data.nameonpan)) {
      setNameonPanErr("Please enter name on pancard");
      validate = false;
    }
    if (!/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(data.pancard)) {
      setPanCardErr("Please enter valid pan number");
      validate = false;
    }

    if (validate) {
      setLoading(true);
      setNameonPanErr("");
      setPanCardErr("");
      await CompleteKyc(data).then(
        (res) => {
          if (res.status === 200) {
            setLoading(false);
            swal(res.message, "check your phone!", "success").then(
              (willdelete) => {
                if (willdelete) {
                  navigate("/dashboard");
                }
              }
            );
          } else {
            swal("Failure!!", "Failed to load", "warning").then(
              setLoading(false)
            );
          }
        },
        (err) => {
          swal("Failure!!", "Something went wrong!..", "error").then(
            setLoading(false)
          );
        }
      );
    }

    console.log(data);
    //   function validatePAN(Pan) {
    //     var PAN_Card_No = Pan.toUpperCase();
    //     var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    //     if (PAN_Card_No.length == 10) {
    //         if (PAN_Card_No.match(regex)) {
    //             return "Valid Pan Number";
    //         } else {
    //             return "InValid Pan Number";
    //         }
    //     } else {
    //         return "Enter Valid Pan Number";
    //     }
    // };

    // console.log(formData);
  };
  // navigate({ replace: true });
  return (
    <div>
      <section className="d-flex align-items-center justify-content-center vh-100">
        <div className="container ">
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 card rounded-3 p-4">
              <div className="mb-5 mt-3">
                <img src={logo} alt="" style={{ height: "30px" }} />
              </div>
              <div className="mb-4">
                <h5>Complete KYC </h5>
                <p>To complete the KYC please fill the below details.</p>
              </div>
              <form>
                <div className="form-outline mb-3">
                  <label htmlFor="">Pan Card Name</label>
                  <input
                    type="text"
                    autoComplete="false"
                    className="form-control"
                    placeholder="Enter Name On Pan"
                    id="nameonpan"
                    value={!null ? data.nameonpan : ""}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="text-danger"> {nameonpanErr}</span>
                </div>
                <div className="form-outline">
                  <label htmlFor="">Pan Card Number</label>
                  <br />
                  <input
                    type="text"
                    autoComplete="false"
                    className="form-control"
                    placeholder="Enter Pan Number"
                    id="pancard"
                    value={data.pancard}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="text-danger">{pancardErr}</span>
                </div>

                <div className="mt-3">
                  <p>
                    Note: KYC verification procedure will take 5-7 working days.
                    Once your KYC has been verified you will get a notification
                    in the app.
                  </p>
                </div>
                <div className="pt-1 mb-4 App d-grid">
                  {loading ? (
                    <div className="mx-auto">
                      <ThreeDots />
                    </div>
                  ) : (
                    <button
                      className=" gradient_class btn btn-lg btn-block"
                      type="button"
                      onClick={submit}
                    >
                      {" "}
                      Continue{" "}
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kyc;
