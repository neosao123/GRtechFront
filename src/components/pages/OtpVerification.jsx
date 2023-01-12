import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/GR_tech_logo/GRTECH PAYMENT Final-2.png";
import { resendOtp, VerifyOtp } from "../../networkcalls/ClientApi";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { useCookies } from "react-cookie";
const OtpVerification = () => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [invalidOtp, setInvalidOtp] = useState();
  const [resendLoading, setResendLoading] = useState(false);
  let mobile = sessionStorage.getItem("mobile");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);
  const handleResendOtp = () => {
    setResendLoading(true);
    resendOtp({ mobile: mobile }).then(
      (res) => {
        if (res.status === 200) {
          setResendLoading(false);
          swal("OTP was sent successfully!", "check your phone!", "success");
        }
      },
      (err) => {
        swal(err.message, "Try Again!", "warning");
      }
    );
  };

  const verify = async (e) => {
    e.preventDefault();
    let data = { mobile, otp };
    setLoading(true);
    await VerifyOtp(data).then(
      (res) => {
        sessionStorage.setItem("clientCode", res?.result?.code);
        sessionStorage.setItem("panVerify", res?.result?.panVerify);
        sessionStorage.setItem("fullname", res?.result?.fullname);
        JSON.stringify(sessionStorage.setItem("clientData", res.result));
        let panVerify = sessionStorage.getItem("panVerify");

        if (res.status === 200) {
          sessionStorage.setItem("client", "clientLoggedIn");
          setLoading(false);
          swal(`OTP Verified!`, res.message, "success").then((willdelete) => {
            if (willdelete) {
              if (res.accountExist === 0) {
                navigate("/profile");
              } else if (res.accountExist === 1 && panVerify === "0") {
                navigate("/kyc");
              } else {
                setTimeout(() => {
                  navigate("/dashboard");
                }, 300);
              }
            }
            let random = Math.floor(Math.random() * 999999999);
            setCookie("token", random, { path: "/" });
          });
        } else {
          swal("Failure!!", res.message, "warning").then(setLoading(false));
        }
      },
      (err) => {
        swal("Failure!!", "Something went wrong!..", "error");
      }
    );
  };

  return (
    <div>
      <section className="d-flex align-items-center justify-content-center vh-100">
        <div className="container ">
          <div className="row g-0">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 card rounded-3 p-4">
              <div className=" mb-3 mt-3">
                <div
                  className="btn btn-outline-success"
                  onClick={(e) => navigate("/")}
                >
                  <i class="fa-sharp fa-solid fa-arrow-left"></i>
                </div>
                <div className="text-center">
                  <img src={logo} alt="" style={{ height: "30px" }} />
                </div>
              </div>
              <div className=" mt-3 mb-2">
                <h5 className="">OTP Verification</h5>
                <p>+91{!null ? mobile : ""}</p>
              </div>
              <form>
                <div className="form-outline mb-4">
                  <label htmlFor="">OTP</label>
                  <input
                    type="nubmer"
                    autoComplete="false"
                    className="form-control"
                    placeholder="Enter Your OTP"
                    id="otp"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="pt-1 mb-4 App d-grid">
                  {loading ? (
                    <div className="mx-auto">
                      <ThreeDots />
                    </div>
                  ) : (
                    <button
                      className="gradient_class btn btn-block"
                      type="button"
                      onClick={verify}
                    >
                      {" "}
                      Continue{" "}
                    </button>
                  )}
                </div>
              </form>
              {resendLoading ? (
                <p className="text-primary">Please Wait...</p>
              ) : (
                <p
                  className="text-primary "
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleResendOtp()}
                >
                  Resend Again?
                </p>
              )}
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OtpVerification;
