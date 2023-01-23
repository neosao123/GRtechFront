import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { saveAadharDetails } from "../../networkcalls/Become_a_Retailer";

const Step2_AdhaarDetails = () => {
  const loader = document.querySelector("div.loader");
  let navigate = useNavigate();
  let clientCode = sessionStorage.getItem("clientCode");
  //details
  const [aadharNumber, setAadharNumber] = useState();
  const [nameOnAadhar, setNameOnAadhar] = useState();
  //errors
  const [aadharNumberErr, setAadharNumberErr] = useState();
  const [nameOnAadharErr, setNameOnAadharErr] = useState();

  const submit = (e) => {
    e.preventDefault();
    let validate = true;
    let allData = {
      clientCode: clientCode,
      aadharcardnumber: aadharNumber,
      nameonaadhar: nameOnAadhar,
    };

    // if (!/^[2-9][0-9]{11}$/.test(allData.aadharcardnumber)) {
    //   setAadharNumberErr("Please enter valid aadhar number");
    //   validate = false;
    // }
    if (
      allData.aadharcardnumber === undefined ||
      allData.aadharcardnumber?.trim() === ""
    ) {
      setAadharNumberErr("Please enter aadhar number");
      validate = false;
    }

    if (
      allData.nameonaadhar === undefined ||
      allData.nameonaadhar.trim() === ""
    ) {
      setNameOnAadharErr("Please enter name on aadhar");
      validate = false;
    }

    if (!/^[a-zA-Z ]*$/.test(allData.nameonaadhar)) {
      setNameOnAadharErr("Please enter valid name");
      validate = false;
    }

    if (validate) {
      setAadharNumberErr("");
      setNameOnAadharErr("");
      loader.classList.remove("d-none");
      saveAadharDetails(allData).then(
        (res) => {
          loader.classList.add("d-none");
          if (res?.data?.status === 200) {
            console.log(res?.data?.aadharKYC);
            swal("Success", res?.data?.message, "success").then((ok) => {
              if (ok) {
                sessionStorage.setItem("aadharKYC", res?.data?.aadharKYC);

                navigate("/become_a_retailer/stepthree");
              }
            });
          } else {
            swal("Warning", res?.data?.message, "warning");
          }
        },
        (err) => {
          swal("danger", "server error", "error");
        }
      );
    }
  };

  return (
    <div className="unloader">
      <div className="container">
        <div className="row">
          <div className="col-md-4 ">
            <div className="card mt-5">
              <div className="card-body">
                <div className="row">
                  <h5 style={{ fontWeight: 600 }}>Become a Retailer</h5>
                  <p>
                    To become a retailer please complete the following steps
                  </p>
                  <div className="col-md-12">
                    <div>Step 2/4</div>
                  </div>
                  <div className="col-md-4">
                    <div class="progress mt-2 mb-2">
                      <div
                        class="gradient_class"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <h6>
                      <b>Aadhar Details</b>
                    </h6>
                    <label className="mt-2">Aadhar Card No</label>
                    <div>
                      <input
                        className="form-control"
                        placeholder="9970 9970 9970"
                        value={aadharNumber || ""}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        type="text"
                      />
                      <span className="text-danger">{aadharNumberErr}</span>
                    </div>
                    <div>
                      <label htmlFor="" className="mt-2">
                        Name on Aadhar
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={nameOnAadhar || ""}
                        onChange={(e) => setNameOnAadhar(e.target.value)}
                      />
                      <span className="text-danger">{nameOnAadharErr}</span>
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
    </div>
  );
};

export default Step2_AdhaarDetails;
