import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { saveBankDetails } from "../../networkcalls/Become_a_Retailer";

const Step3_BankDetails = () => {
  const loader = document.querySelector("div.loader");
  let navigate = useNavigate();
  let clientCode = sessionStorage.getItem("clientCode");

  const [accNumber, setAccNumber] = useState();
  const [bankName, setBankName] = useState();
  const [ifscCode, setIfscCode] = useState();

  //error msgs
  const [accNumberErr, setAccNumberErr] = useState();
  const [bankNameErr, setBankNameErr] = useState();
  const [ifscCodeErr, setIfscCodeErr] = useState();

  const submit = (e) => {
    e.preventDefault();
    let validate = true;
    let allData = {
      clientCode: clientCode,
      bankaccnumber: accNumber,
      bankname: bankName,
      ifsccode: ifscCode,
    };
    if (allData.bankaccnumber === undefined || allData.bankaccnumber === "") {
      validate = false;
      setAccNumberErr("Please enter valid account number");
    }
    if (!/^\d{9,18}$/.test(allData.bankaccnumber)) {
      setAccNumberErr("Please enter valid account number");
    }
    if (allData.bankname === undefined || allData.bankname === "") {
      validate = false;
      setBankNameErr("Please enter bank name");
    }
    if (allData.ifsccode === undefined || allData.ifsccode === "") {
      validate = false;
      setIfscCodeErr("Please enter IFSC code");
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(allData.ifsccode)) {
      setIfscCodeErr("Please enter valid ISFC code");
    }
    if (validate) {
      setAccNumberErr("");
      setBankNameErr("");
      setIfscCodeErr("");

      loader.classList.remove("d-none");
      saveBankDetails(allData).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.data?.status === 200) {
            sessionStorage.setItem("bankKYC", res?.data?.bankKYC);
            swal("Success", res?.data?.message, "success").then((ok) => {
              if (ok) {
                navigate("/myprofile");
              }
            });
          } else {
            swal("Warning", res?.data?.message, "warning");
          }
        },
        (err) => {
          swal("Danger", "server error", "error");
        }
      );
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <div className="row">
                  <h5 style={{ fontWeight: 600 }}>Become a Retailer</h5>
                  <p>
                    To become a retailer please complete the following steps
                  </p>
                  <div className="col-md-12">
                    <div>Step 3/4</div>
                  </div>
                  <div className="col-md-4">
                    <div class="progress mt-2 mb-2">
                      <div
                        class="gradient_class"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <h6>
                      <b>Bank Details</b>
                    </h6>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label htmlFor="">Bank Name</label>
                    <input
                      className="form-control"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      type="text"
                    />
                    <span className="text-danger">{bankNameErr}</span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label htmlFor="">Account No</label>
                    <input
                      className="form-control"
                      value={accNumber}
                      onChange={(e) => setAccNumber(e.target.value)}
                      type="number"
                    />
                    <span className="text-danger">{accNumberErr}</span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label htmlFor="">IFSC Code</label>
                    <input
                      className="form-control"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      type="text"
                    />
                    <span className="text-danger">{ifscCodeErr}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <button
                      type="button"
                      onClick={submit}
                      class="btn btn-success"
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
    </div>
  );
};

export default Step3_BankDetails;
